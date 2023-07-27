const mysql = require("../connection").con;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
             res.redirect('/dashboard');
          }
        }
      );
    }
  );
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
              res.redirect('/dashboard');
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
    const filePath = path.join(__dirname, '/pictures/upload/users/', username + '.jpg');

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
