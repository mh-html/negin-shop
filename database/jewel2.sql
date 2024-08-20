-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2024 at 09:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jewel2`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` int(10) NOT NULL,
  `category` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `raiting` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `category`, `image`, `raiting`) VALUES
(1, 'کفش پچگانه صورتی', 'کفش بچگانه صورتی رنگ با جنس عالی تولید تهران', 350000, 'بچگانه', 'http://localhost:8081/images/baby.jpg', 4),
(2, 'کتونی شیک', 'کفش کتونی در سایز های مختلف و رنگ بندی زیبا ساخت کشور ترکیه', 870000, 'مردانه', 'http://localhost:8081/images/mountain.jpg', 4),
(3, 'کفش اسپرت', 'کفش اسپرت قرمز مخصوص ورزشکاران حرفه ای تولید تبریز', 560000, 'مردانه - زنانه', 'http://localhost:8081/images/red-sport.jpg', 5),
(4, 'کفش کوهستانی', 'کفش کوهستانی چرمی با دوردوزی دستی - مناسب برای مراسم های خاص و مکان های سخت', 990000, 'مردانه', 'http://localhost:8081/images/sport.jpg', 3),
(5, 'کفش ورنی مجلسی', 'کفش ورنی مجلسی مخصوص اقایان شیک پوش', 520000, 'مردانه', 'http://localhost:8081/images/verny.jpg', 2),
(6, 'اسپرت سفید', 'کفش اسپرت سفید برند نایک - بسیار راحت و سبک مخصوص پیاده روی های زیاد', 460000, 'مردانه - زنانه', 'http://localhost:8081/images/white-sport.jpg', 3),
(7, 'کفش الفا شیک', 'کفش مجلسی مخصوص خانم های شیک پوش - نگین کاری شده محصول ترکیه - در انواع سایز ها و طرح ها', 1050000, 'زنانه', 'http://localhost:8081/images/women.jpg', 5),
(8, 'کفش مجلسی', 'کفش مجلسی زنانه - با رنگ های متفاوت و طرح های خاص - ساده و شیک', 930000, 'زنانه', 'http://localhost:8081/images/women2.jpg', NULL),
(9, 'کفش عروس', 'کفش سفید لاکچری چرمی مخصوص عروس  - ساخت کشور ترکیه - ساده و سبک با طراحی خفن', 1300000, 'زنانه', 'http://localhost:8081/images/women3.jpg', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_products`
--

CREATE TABLE `user_products` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_products`
--
ALTER TABLE `user_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_products`
--
ALTER TABLE `user_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_products`
--
ALTER TABLE `user_products`
  ADD CONSTRAINT `user_products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
