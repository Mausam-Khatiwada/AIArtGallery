-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 27, 2023 at 06:10 AM
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
  `email` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `fullname`, `password`, `path`) VALUES
(1, 'mausam@gmail.com', 'Mausam Khatiwada', 'mausam123', '/pictures/upload/admin/Mausam.jpg');

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
(64, 'Mausam', 'Mausam Khatiwada', 'Batman cooking in a wood kitchen', 'batman cooking in a wood kitchen, creative, neon colors, colorful,  luminous, realistic, colorful, 8k, 4k, high resolution, viking style, mystical, universe style', '/pictures/upload/artworks/artPicture-1690182479667.jpg'),
(65, 'Mausam', 'Mausam Khatiwada', 'A majestic lord baby Krishna', 'A majestic lord baby Krishna, with a divine aura radiating from his body, standing atop a lotus flower in a tranquil pond.', '/pictures/upload/artworks/artPicture-1690182644796.jpg'),
(66, 'Mausam', 'Mausam Khatiwada', 'Splash Art', 'Splash art, a american bully head, ((white background)), roaring, epic Instagram, artstation, splash style of colorful paint, contour, hyperdetailed intricately detailed , unreal engine, fantastical, intricate detail, splash screen, complementary colors, fantasy concept art, 8k resolution, deviantart masterpiece, oil painting, heavy strokes, paint dripping, splash arts', '/pictures/upload/artworks/artPicture-1690183163388.jpg'),
(67, 'Mausam', 'Mausam Khatiwada', 'A delicious triple meat burger', 'a delicious triple meat burger with bacon and yellow cheese, accompanied with a glass of whiskey on the rocks', '/pictures/upload/artworks/artPicture-1690183401752.jpg'),
(68, 'Mausam', 'Mausam Khatiwada', 'A white cat baby is doing a martial artsmove', 'A white cat baby is doing a martial artsmnove, cute，happy,smiling，funny，white background，in the style of historical themes, concept art, oriental, detailed Hanfu costumes,mastery of perspective，realistic，3D', '/pictures/upload/artworks/artPicture-1690183566959.jpg'),
(69, 'Mausam', 'Mausam Khatiwada', 'Cute and adorable Rabbit', 'cute and adorable rabbit, steampunk, futuristic, neon lighting, baroque, ornate, bokeh from streetlights,sunbeam, intricate detail. 8k, dreamlike, super cute, symmetrical, soft lighting, trending on artstation, intricate details, highly detailed,  unreal engine, by ross tran, wlop, artgerm and james jean, Brian Froud, art illustration by Miho Hirano, Neimy Kanani, oil on canvas by Aykut Aydoğdu, cute big circular reflective eyes, Pixar render, unreal engine cinematic smooth, intricate detail', '/pictures/upload/artworks/artPicture-1690184022538.jpg'),
(70, 'Stark', 'Tony Stark', 'A boy gamer', 'a boy gamer , with his full streaming setup , use neon syberpunk color , heavy strokes ', '/pictures/upload/artworks/artPicture-1690192255113.jpg'),
(71, 'Stark', 'Tony Stark', 'Lord Krishna', 'In this enchanting artwork, Lord Krishna stands in a verdant meadow of Vrindavan, bathed in the soft glow of the setting sun. The evening breeze gently rustles the leaves of the surrounding trees, setting the stage for a divine spectacle.Krishna, with his bluish complexion radiating with a celestial aura, stands with grace and charm. His charming smile captivates all who lay their eyes upon him, filling the hearts of onlookers with love and devotion. His eyes, deep and expressive like the vast cosmos, reflect his infinite wisdom and compassion.Dressed in vibrant yellow silk dhoti and an intricately patterned angavastram draped over his shoulder, Krishna looks resplendent. The peacock feather adorning his crown dances with elegance as if mimicking the swaying of his melodious flute held in his left hand.As the divine flutist, Krishna lifts the instrument to his lips, and magical strains of celestial music fill the air. The notes, like nectar, carry an enchanting melody that transcends e', '/pictures/upload/artworks/artPicture-1690192443085.jpg'),
(72, 'Stark', 'Tony Stark', 'Cute Dragons', 'A beautiful tiny cute colorful dragon,happy face,with a backpack ,ride a cute wasp,it is raining', '/pictures/upload/artworks/artPicture-1690192688275.jpg');

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
(20, 'Arpan', 'Arpan Kattel', 'arpan@gmail.com', 'Nepal', '$2a$10$uL37I5dK/G8DYV4VWfLbb.kY/x50sKBlohTqg0A2xsef7YDaU2t9e'),
(21, 'Stark', 'Tony Stark', 'stark@gmail.com', 'America', '$2a$10$iWZi8DlIoZ44qq9BiwvWzeiMNwPSVLkDPKkl/eQNjVwHu7IF4mg5G');

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
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `artwork`
--
ALTER TABLE `artwork`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
