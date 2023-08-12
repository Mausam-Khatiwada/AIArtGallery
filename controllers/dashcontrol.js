const mysql = require("../connection").con;
const jwt = require("jsonwebtoken");
const express = require("express");

const bcrypt = require("bcryptjs");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promisify } = require("util");

exports.adminCreateUser = async (req, res) => {
  const { username, fullname, email, country, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  mysql.query(
    'SELECT username FROM users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render('dashboard', {
          message: '*username is already registered!',
        });
      }

      mysql.query(
        'INSERT INTO users SET ?',
        {
          username: username,
          fullname: fullname,
          email: email,
          country: country,
          password: hashedPassword, // Use the hashed password
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
             console.log('user register');
             res.redirect('/usermanagement');
          }
        }
      );
    }
  );
};

exports.adminCreateAdmin = async (req, res) => {


const adminusername = req.body.adminusername;

  const { adminfullname, adminemail, admincountry, adminpassword } = req.body;
  let imageUrl = ''; // Initialize imageUrl to an empty string

  if (req.file) {
    imageUrl = `/pictures/upload/admin/${req.file.filename}`;
  }


  try {
    const hashedPassword = await bcrypt.hash(adminpassword, 8);

    const results = await new Promise((resolve, reject) => {
      mysql.query('SELECT username FROM admin WHERE username = ?', [adminusername], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      return res.render('adminmanagement', {
        message: '*username is already registered!',
      });
    }

    const insertResult = await new Promise((resolve, reject) => {
      mysql.query(
        'INSERT INTO admin SET ?',
        {
          username: adminusername,
          fullname: adminfullname,
          email: adminemail,
          country: admincountry,
          path: imageUrl,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    console.log('Admin registered:', insertResult);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error occurred:', error);
    // Handle the error appropriately (e.g., send an error response to the client)
    res.status(500).send('Error occurred while creating admin');
  }
};




exports.adminUpdateUser = async (req, res) => {
  try {
    const { id, username, fullname, email, country, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    mysql.query(
      'SELECT username FROM users WHERE username = ? AND id != ?',
      [username, id],
      async (error, results) => {
        if (error) {
          console.error('Error executing SELECT query:', error);
          return res.status(500).send('Internal server error');
        }
        if (results.length > 0) {
          return res.render('dashboard', {
            message: '*username is already registered!',
          });
        }

        // Check if a new profile picture was uploaded
        if (req.file) {
          const oldFilePath = path.join(__dirname, '/pictures/upload/users/', username + '.jpg');
          const newFilePath = path.join(__dirname, '/pictures/upload/users/', username + '-' + Date.now() + '.jpg');

          // Delete the old profile picture file if it exists
          fs.unlink(oldFilePath, (err) => {
            if (err && err.code !== 'ENOENT') {
              console.error('Error deleting old profile picture:', err);
            }
          });

          // Rename the uploaded file to match the new username and move it to the final destination
          fs.rename(req.file.path, newFilePath, (err) => {
            if (err) {
              console.error('Error renaming profile picture:', err);
            }
          });
        }

        mysql.query(
          'UPDATE users SET username = ?, fullname = ?, email = ?, country = ?, password = ? WHERE id = ?',
          [username, fullname, email, country, hashedPassword, id],
          (error, results) => {
            if (error) {
              console.error('Error executing UPDATE query:', error);
              return res.status(500).send('Internal server error');
            } else {
              console.log('user updated');
              res.redirect('/usermanagement');
            }
          }
        );
      }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).send('Internal server error');
  }
};


exports.adminUpdateAdmin = async (req, res) => {
  try {
    const { adminid, adminusername, adminfullname, adminemail, admincountry, adminpassword } = req.body;
    const hashedPassword = await bcrypt.hash(adminpassword, 10);

    mysql.query(
      'SELECT path FROM admin WHERE id = ?',
      [adminid],
      async (error, results) => {
        if (error) {
          console.error('Error executing SELECT query:', error);
          return res.status(500).send('Internal server error');
        }

        console.log(`Result of path = ${results[0].path}`);
        let imageUrl = results[0].path; // Get the existing profile picture path

        if (req.file) {
          const prevFilePath = path.join(__dirname,`../public${imageUrl}`);
          // If a new picture is uploaded, delete the existing file from the file system
          if (prevFilePath) {

            fs.unlink(prevFilePath, (err) => {
              if (err && err.code !== 'ENOENT') {
                console.error('Error deleting old profile picture:', err);
              }
            });
          }

          // Move the new uploaded file to the final destination
          const newFilePath = path.join(__dirname, "../public/pictures/upload/admin/", adminusername + '-' + Date.now() + '.jpg');

          fs.rename(req.file.path, newFilePath, (err) => {
            if (err) {
              console.error('Error renaming profile picture:', err);
            } else {
              // Update the imageUrl with the new file path
              imageUrl = '/pictures/upload/admin/' + path.basename(newFilePath);

              // Update the 'path' column in the database with the new file path
              mysql.query(
                'UPDATE admin SET username = ?, fullname = ?, email = ?, country = ?, password = ?, path = ? WHERE id = ?',
                [adminusername, adminfullname, adminemail, admincountry, hashedPassword, imageUrl, adminid],
                (error, results) => {
                  if (error) {
                    console.error('Error executing UPDATE query:', error);
                    return res.status(500).send('Internal server error');
                  } else {
                    console.log('admin updated');
                    res.redirect('/adminmanagement');
                  }
                }
              );
            }
          });
        } else {
          // If no picture was uploaded, only update the non-picture fields
          mysql.query(
            'UPDATE admin SET username = ?, fullname = ?, email = ?, country = ?, password = ? WHERE id = ?',
            [adminusername, adminfullname, adminemail, admincountry, hashedPassword, adminid],
            (error, results) => {
              if (error) {
                console.error('Error executing UPDATE query:', error);
                return res.status(500).send('Internal server error');
              } else {
                console.log('admin updated');
                res.redirect('/adminmanagement');
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).send('Internal server error');
  }
};



exports.deleteUser = async (userId) => {
  try {
    // First, fetch the user's data to get the username for deleting the associated picture
    const user = await new Promise((resolve, reject) => {
      mysql.query('SELECT username FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!user) {
      throw new Error('User not found');
    }

    const username = user.username;

    // Delete the user's profile picture file
    const filePath = path.join(__dirname, '../public/pictures/upload/users/', username+ '.jpg');

    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error('Error deleting user profile picture:', err);
      }
    });

    // Delete the user from the database
    await new Promise((resolve, reject) => {
      mysql.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log('User deleted');
          resolve();
        }
      });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    throw err;
  }
};
exports.deleteAdmin = async (adminId) => {
  try {
    // First, fetch the user's data to get the username for deleting the associated picture
    const admin = await new Promise((resolve, reject) => {
      mysql.query('SELECT path FROM admin WHERE id = ?', [adminId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    

    // Delete the user's profile picture file
   const adminPicture = path.join(__dirname,`../public${admin.path}`);

    fs.unlink(adminPicture, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error('Error deleting admin profile picture:', err);
      }
    });

    // Delete the user from the database
    await new Promise((resolve, reject) => {
      mysql.query('DELETE FROM admin WHERE id = ?', [adminId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log('Admin deleted');
          resolve();
        }
      });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    throw err;
  }
};
exports.deleteArtwork = async (artworkId) => {
  try {
    const artwork = await new Promise((resolve, reject) => {
      mysql.query('SELECT path FROM artwork WHERE id = ?', [artworkId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!artwork) {
      throw new Error('Artwork not found');
    }
   const artworkPath = path.join(__dirname,`../public${artwork.path}`);
     console.log(artworkPath);

    // Delete the user's profile picture file

    fs.unlink(artworkPath, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error('Error deleting artwork picture:', err);
      }
      else{
        console.log("Artwork picture delected successfully");
      }
    });

    // Delete the artwork from the database
    await new Promise((resolve, reject) => {
      mysql.query('DELETE FROM artwork WHERE id = ?', [artworkId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log('Artwork deleted');
          resolve();
        }
      });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    throw err;
  }
};

exports.getAdmin = (req,res,next)=>{

mysql.query('SELECT * from admin',(err,result)=>{


if (err) {
  console.log(err);
}
else{
const getAdmin = result;
console.log(getAdmin)
req.getAdmin=getAdmin;
next();
}


})

}