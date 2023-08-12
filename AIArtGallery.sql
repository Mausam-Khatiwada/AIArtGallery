-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2023 at 08:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AIArtGallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `fullname`, `country`, `password`, `path`) VALUES
(6, 'Mausam', 'mausam@gmail.com', 'Mausam Khatiwada', 'Nepal', '$2a$08$gSNjfHllqvkC1cUP8.xieuLMMo8Pl6h65y/TVYm0I.eIcAIOk.R56', '/pictures/upload/admin/adminpicture-1690678345038.jpg'),
(9, 'Stark', 'tony@gmail.com', 'Tony Stark', 'America', '$2a$08$BzSvTZlYu9NCH7ZfsSEDoecq8bcGbYMhsaZ1okQ0CIPfhuEgFPtJi', '/pictures/upload/admin/adminpicture-1691736710414.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `artwork`
--

CREATE TABLE `artwork` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `arttitle` varchar(100) NOT NULL,
  `prompt` varchar(1000) NOT NULL,
  `path` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artwork`
--

INSERT INTO `artwork` (`id`, `username`, `artist`, `arttitle`, `prompt`, `path`) VALUES
(65, 'Mausam', 'Mausam Khatiwada', 'A majestic lord baby Krishna', 'A majestic lord baby Krishna, with a divine aura radiating from his body, standing atop a lotus flower in a tranquil pond.', '/pictures/upload/artworks/artPicture-1690182644796.jpg'),
(69, 'Mausam', 'Mausam Khatiwada', 'Cute and adorable Rabbit', 'cute and adorable rabbit, steampunk, futuristic, neon lighting, baroque, ornate, bokeh from streetlights,sunbeam, intricate detail. 8k, dreamlike, super cute, symmetrical, soft lighting, trending on artstation, intricate details, highly detailed,  unreal engine, by ross tran, wlop, artgerm and james jean, Brian Froud, art illustration by Miho Hirano, Neimy Kanani, oil on canvas by Aykut Aydoğdu, cute big circular reflective eyes, Pixar render, unreal engine cinematic smooth, intricate detail', '/pictures/upload/artworks/artPicture-1690184022538.jpg'),
(70, 'Stark', 'Tony Stark', 'A boy gamer', 'a boy gamer , with his full streaming setup , use neon syberpunk color , heavy strokes ', '/pictures/upload/artworks/artPicture-1690192255113.jpg'),
(71, 'Stark', 'Tony Stark', 'Lord Krishna', 'In this enchanting artwork, Lord Krishna stands in a verdant meadow of Vrindavan, bathed in the soft glow of the setting sun. The evening breeze gently rustles the leaves of the surrounding trees, setting the stage for a divine spectacle.Krishna, with his bluish complexion radiating with a celestial aura, stands with grace and charm. His charming smile captivates all who lay their eyes upon him, filling the hearts of onlookers with love and devotion. His eyes, deep and expressive like the vast cosmos, reflect his infinite wisdom and compassion.Dressed in vibrant yellow silk dhoti and an intricately patterned angavastram draped over his shoulder, Krishna looks resplendent. The peacock feather adorning his crown dances with elegance as if mimicking the swaying of his melodious flute held in his left hand.As the divine flutist, Krishna lifts the instrument to his lips, and magical strains of celestial music fill the air. The notes, like nectar, carry an enchanting melody that transcends e', '/pictures/upload/artworks/artPicture-1690192443085.jpg'),
(73, 'Kabeen', 'Kabeen Shrestha', 'Power of Man', 'Sam\'s eyes glow with a mysterious power as he stares into the portal, his hands crackling with energy.', '/pictures/upload/artworks/artPicture-1692341200574.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `review` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `username`, `fullname`, `review`) VALUES
(10, 'Kabeen', 'Kabeen Shrestha', 'AI Art Gallery is a captivating platform that celebrates the fusion of human creativity and artificial intelligence. Empowering users to showcase their AI-generated masterpieces sourced from across the web, it\'s a captivating space where innovation meets artistic expression. With its user-friendly interface and diverse collection, AI Art Gallery invites enthusiasts to explore the forefront of digital artistry.'),
(12, 'Mausam', 'Mausam Khatiwada', 'AI Art Gallery has completely redefined the art world for me. The fusion of AI-generated and human-made art is mesmerizing. Every piece tells a unique story that blurs the lines between creativity and technology. It\'s a journey through imagination like no other. The real-time search feature ensures a seamless exploration of captivating artworks. AI Art Gallery has truly created a space where innovation meets inspiration.'),
(13, 'Niraj', 'NIraj Pathak', 'AI Art Gallery is a game-changer in the art realm. The harmonious blend of AI-generated and human-crafted art is truly captivating. Each piece is a masterpiece that blurs the boundaries of creativity and technology. Navigating through the gallery is an immersive experience, sparking inspiration at every click. The real-time search feature makes discovering enchanting artworks effortless. AI Art Gallery is a testament to the evolving world of art and its limitless possibilities.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `country`, `password`) VALUES
(18, 'Mausam', 'Mausam Khatiwada', 'mausam@gmail.com', 'Nepal', '$2a$10$82fCzDktU9LGj5IC/dFGr.u0sLr1yuyR3H2WiaIydpPXLAoaQsOGS'),
(19, 'Niraj', 'NIraj Pathak', 'NIraj@gmail.com', 'Nepal', '$2a$10$7/sz/gyB1l9Q0NGBAj87NeowJhT0PbzSZiuQAOI47Dhn1.Azj93j.'),
(21, 'Stark', 'Tony Stark', 'stark@gmail.com', 'America', '$2a$10$iWZi8DlIoZ44qq9BiwvWzeiMNwPSVLkDPKkl/eQNjVwHu7IF4mg5G'),
(29, 'Arpan', 'Arpan Kattel', 'arpan@gmail.com', 'Nepal', '$2a$10$7QldSn7DoWmlqfxGwj.SvObDIGn02kq0pqcbqH1giu79fUTy0fGIS'),
(30, 'Chandra', 'Chandra kumar karki', 'chandra1@gmail.com', 'Nepal', '$2a$10$4dlDX4yx1vxFx7ZYM8GRdO8W1evz.ar.URhZ7U1Fe73CDkHZ1li9i'),
(31, 'Kabeen', 'Kabeen Shrestha', 'Kabeen123@gmail.com', 'Nepal', '$2a$08$/VBN7xC3mR5OAaws5ZK90eD.mdcApkmN74AtgFGSNF1OnYyn9rvx2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artwork`
--
ALTER TABLE `artwork`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `artwork`
--
ALTER TABLE `artwork`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
