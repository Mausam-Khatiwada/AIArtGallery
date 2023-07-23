-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 23, 2023 at 04:21 AM
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
-- Table structure for table `artwork`
--

CREATE TABLE `artwork` (
  `id` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `arttitle` varchar(100) NOT NULL,
  `prompt` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artwork`
--

INSERT INTO `artwork` (`id`, `username`, `artist`, `arttitle`, `prompt`) VALUES
(3, 'Mausam', 'Mausam Khatiwada', '', 'dsfsfgbbyu'),
(11, 'Mausam', 'Mausam Khatiwada', '', 'fdg er rtyg thy rtt'),
(12, 'Mausam', 'Mausam Khatiwada', 'Talking robot', 'cvsdfg dghgdf hrthgrs trhyhr ythyrh'),
(28, 'Stark', 'Tony Stark', 'weather', 'fgvdf fdgvfg dfdfhbd hds hfdh');

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
(4, 'Kabin', 'Kabin SHrestha', 'kabin@gmail.com', 'Nepal', '$2a$08$kY/ic.HsQ11wy7i3GZ2RqO/YisK4Mhoh6HLP94709PLY3FgdPyo7a'),
(5, 'Mausam', 'Mausam Khatiwada', 'mausam@gmail.com', 'Nepal', '$2a$08$zw9MIYs9hAINCzUoGGwcneMmwtUQ1GI0/doVchSb25FeDw1a5TuqS'),
(6, 'Stark', 'Tony Stark', 'tony@gmail.com', 'United States', '$2a$08$.FWQyLQbKk.y9hvPQGJUB.aR44N56.qqen93ouIMIllaslmbCKd6a');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `artwork`
--
ALTER TABLE `artwork`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
