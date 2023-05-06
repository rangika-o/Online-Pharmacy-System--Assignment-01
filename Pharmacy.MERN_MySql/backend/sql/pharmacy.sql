-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2023 at 09:04 PM
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
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `cart_quantity` int(11) NOT NULL,
  `total` double NOT NULL,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `cart_quantity`, `total`, `item_id`, `user_id`) VALUES
(1, 1, 456, 1, 2),
(2, 1, 12, 5, 2),
(3, 7, 68600, 12, 2),
(4, 3, 25200, 10, 2),
(5, 4, 29760, 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `image` varchar(550) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `title`, `description`, `image`, `price`, `quantity`) VALUES
(9, 'Beurer Facial Steamer 605', 'Facial sauna for a healthy glow ? the facial sauna is ideal both for cosmetic facial care and for inhalation with the appropriate steam attachment for mouth and nose inhalation', '6xunpvg8klh7x93d4-Steamer.png', 7440, 25),
(10, 'Rossmax Fingertip Pulse Oximeter', 'easy reading – Shielded Design blocks Ambient Light – Biocompatibility & Anti-Allergic Design – One-touch ON/OFF key – Pulse Strength Indicator – Cord-attached – Economical & portable health management tool', '6xunpvg8klh7xksr4-Oximeter.png', 8400, 12),
(11, 'ACNIL SOAP 100g', 'Anti Acne Anti Bacterial & Anti Fungal Low pH balance For all skin types', '6xunpvg8klh7xrava-storedes2.png', 750, 30),
(12, 'Spirit Majestic Series Adult Dual Head Stethoscope', 'CK-601P', '6xunpvg8klh7xu16s-Stethoscope.png', 9800, 12),
(13, 'ISOCAL POWDER 425g', 'Provides isotonic feeding (Osmolality; 300 mOsm/kg water at 1 kcal/ml dilution ) Can be reconstituted at varying concentrations (0.5 to 2.0 kcal/ml density) 18.79% of fat as MCT Lactose-free Pleasant taste', '6xunpvg8klh7xx018-Isocal.png', 4795, 28),
(14, 'AQUASOFT SOAP 75g', 'For Dry Skin Can be used instead of ordinary soap', '6xunpvg8klh7y1um0-Aquasoft.png', 987, 16);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `userType` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `password`, `userType`) VALUES
(2, 'Tharushi', '0713456789', 'tharushi33@gmail.com', '6976a479bb8ccec2927b06359f067108', 'user'),
(3, 'Admin', '0765634231', 'h@gmail.com', '202cb962ac59075b964b07152d234b70', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
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
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
