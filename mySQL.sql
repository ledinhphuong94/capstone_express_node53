CREATE TABLE IF NOT EXISTS `users`(
	`userId` INT AUTO_INCREMENT PRIMARY KEY,
	`email` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255),
	`name` VARCHAR(255),
	`birthDate` DATE,
	`avatar` VARCHAR(255),
	`googleId` VARCHAR(255),
	`sessionId` VARCHAR(255),
	`isVerifyEmail` TINYINT (1) DEFAULT 0,
	-- 
	`deletedBy` INT NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `images`(
	`imgId` INT AUTO_INCREMENT PRIMARY KEY,
	`imgName` VARCHAR(255),
	`imgUrl` VARCHAR(255) NOT NULL,
	`imgDesc` TEXT,
	`userId` INT NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
	-- 
	`deletedBy` INT NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `verifiedEmail`(
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	`userId` INT NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
	`verifyCode` VARCHAR(6),
	`codeExpiration` TIMESTAMP,
	-- 
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `comments` (
	`commentId` INT AUTO_INCREMENT PRIMARY KEY,
	`userId` INT NOT NULL,
	`imgId` INT NOT NULL,
	`content` TEXT,
	FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
	FOREIGN KEY (`imgId`) REFERENCES `images`(`imgId`),
	-- 
	`deletedBy` INT NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `bookmarks` (
	`bookmarkId` INT AUTO_INCREMENT PRIMARY KEY,
	`userId` INT NOT NULL,
	`imgId` INT NOT NULL,
	UNIQUE KEY `unique_user_img` (`userId`, `imgId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
	FOREIGN KEY (`imgId`) REFERENCES `images`(`imgId`),
	-- 
	`deletedBy` INT NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `likes` (
	`likeId` INT AUTO_INCREMENT PRIMARY KEY,
	`userId` INT NOT NULL,
	`imgId` INT NOT NULL,
	UNIQUE KEY `unique_user_img` (`userId`, `imgId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
	FOREIGN KEY (`imgId`) REFERENCES `images`(`imgId`),
	-- 
	`deletedBy` INT NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert DATA
INSERT INTO users (email, password, name, birthDate, avatar, googleId, sessionId, isVerifyEmail, deletedBy, deletedAt, isDeleted, createdAt, updatedAt, aboutMe)
VALUES 
('nguyenvana@gmail.com', '$2b$10$xyz123', 'Nguyen Van A', '1990-05-15', 'https://i.pravatar.cc/150?u=1', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Hello, I am A'),
('tranvanb@gmail.com', '$2b$10$xyz123', 'Tran Van B', '1992-08-20', 'https://i.pravatar.cc/150?u=2', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Developer from HN'),
('lethic@gmail.com', '$2b$10$xyz123', 'Le Thi C', '1995-12-10', 'https://i.pravatar.cc/150?u=3', 'google_id_101', NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Traveler'),
('phamvand@gmail.com', '$2b$10$xyz123', 'Pham Van D', '1988-03-05', 'https://i.pravatar.cc/150?u=4', NULL, NULL, 0, 0, NULL, 0, NOW(), NOW(), 'Food lover'),
('hoangthie@gmail.com', '$2b$10$xyz123', 'Hoang Thi E', '2000-01-01', 'https://i.pravatar.cc/150?u=5', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Designer'),
('vuvand@gmail.com', '$2b$10$xyz123', 'Vu Van F', '1994-07-15', 'https://i.pravatar.cc/150?u=6', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Gamer'),
('daothig@gmail.com', '$2b$10$xyz123', 'Dao Thi G', '1991-09-25', 'https://i.pravatar.cc/150?u=7', NULL, NULL, 0, 0, NULL, 0, NOW(), NOW(), 'Freelancer'),
('buivanh@gmail.com', '$2b$10$xyz123', 'Bui Van H', '1985-11-30', 'https://i.pravatar.cc/150?u=8', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Manager'),
('duongthii@gmail.com', '$2b$10$xyz123', 'Duong Thi I', '1997-04-12', 'https://i.pravatar.cc/150?u=9', 'google_id_102', NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Music fan'),
('ngo_van_k@gmail.com', '$2b$10$xyz123', 'Ngo Van K', '1993-02-28', 'https://i.pravatar.cc/150?u=10', NULL, NULL, 0, 0, NULL, 0, NOW(), NOW(), 'Student'),
('lythil@gmail.com', '$2b$10$xyz123', 'Ly Thi L', '1999-06-18', 'https://i.pravatar.cc/150?u=11', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Photographer'),
('dovanm@gmail.com', '$2b$10$xyz123', 'Do Van M', '1987-10-05', 'https://i.pravatar.cc/150?u=12', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Chef'),
('phan_thi_n@gmail.com', '$2b$10$xyz123', 'Phan Thi N', '1996-08-14', 'https://i.pravatar.cc/150?u=13', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Artist'),
('truongvano@gmail.com', '$2b$10$xyz123', 'Truong Van O', '1990-12-25', 'https://i.pravatar.cc/150?u=14', NULL, NULL, 0, 0, NULL, 0, NOW(), NOW(), 'Teacher'),
('tranthip@gmail.com', '$2b$10$xyz123', 'Tran Thi P', '1992-03-19', 'https://i.pravatar.cc/150?u=15', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Doctor'),
('dangvanq@gmail.com', '$2b$10$xyz123', 'Dang Van Q', '1989-05-22', 'https://i.pravatar.cc/150?u=16', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Engineer'),
('maithir@gmail.com', '$2b$10$xyz123', 'Mai Thi R', '1998-07-07', 'https://i.pravatar.cc/150?u=17', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Writer'),
('dinhvans@gmail.com', '$2b$10$xyz123', 'Dinh Van S', '1994-11-11', 'https://i.pravatar.cc/150?u=18', NULL, NULL, 0, 0, NULL, 0, NOW(), NOW(), 'Accountant'),
('quachthit@gmail.com', '$2b$10$xyz123', 'Quach Thi T', '1991-01-30', 'https://i.pravatar.cc/150?u=19', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Marketing'),
('lamvanu@gmail.com', '$2b$10$xyz123', 'Lam Van U', '1995-09-09', 'https://i.pravatar.cc/150?u=20', NULL, NULL, 1, 0, NULL, 0, NOW(), NOW(), 'Blogger');

-- MOCK UP DATA IMAGES --
INSERT INTO images (
  imgName,
  imgUrl,
  imgDesc,
  userId,
  deletedBy,
  deletedAt,
  isDeleted
) VALUES
(
  'Sunset Beach',
  'cld-sample-5.jpg',
  'A beautiful sunset at the beach with orange sky',
  1,
  0,
  NULL,
  0
),
(
  'Mountain View',
  'cld-sample-3.jpg',
  'Snowy mountains under a clear blue sky',
  1,
  0,
  NULL,
  0
),
(
  'City Night',
  'cld-sample-4.jpg',
  'City skyline at night with colorful lights',
  2,
  0,
  NULL,
  0
),
(
  'Forest Path',
  'cld-sample-5.jpg',
  'A quiet path in the middle of a green forest',
  3,
  0,
  NULL,
  0
),
(
  'Desert Dunes',
  'cld-sample-6.jpg',
  'Golden sand dunes under strong sunlight',
  4,
  0,
  NULL,
  0
),
(
  'Ocean Waves',
  'cld-sample-7.jpg',
  'Strong waves crashing on the shore',
  5,
  0,
  NULL,
  0
),
(
  'Rainy Street',
  'cld-sample-8.jpg',
  'Street view during rain with reflections on road',
  2,
  0,
  NULL,
  0
),
(
  'Autumn Leaves',
  'cld-sample-9.jpg',
  'Fallen leaves in autumn season',
  10,
  0,
  NULL,
  0
),
(
  'Night Sky',
  'cld-sample-10.jpg',
  'Starry night sky with Milky Way',
  11,
  0,
  NULL,
  0
),
(
  'Waterfall',
  'cld-sample-11.jpg',
  'A tall waterfall in the middle of the jungle',
  12,
  0,
  NULL,
  0
);

-- MOCK UP DATA COMMENTS -- 
INSERT INTO comments (userId, imgId, content, deletedBy, isDeleted, createdAt) 
VALUES 
(1, 1, 'Ảnh này góc chụp đẹp quá!', 0, 0, '2024-05-01 08:15:20'),
(3, 2, 'Màu sắc nhìn rất tự nhiên.', 0, 0, '2024-05-01 09:30:00'),
(15, 1, 'Cho mình hỏi chụp bằng máy gì thế?', 0, 0, '2024-05-01 10:05:12'),
(2, 5, 'Tuyệt vời, hóng các bộ ảnh sau.', 0, 0, '2024-05-01 11:20:45'),
(7, 3, 'Cảnh ở đâu mà thơ mộng vậy bạn?', 0, 0, '2024-05-02 07:10:00'),
(5, 10, '10 điểm không có nhưng luôn.', 0, 0, '2024-05-02 08:45:33'),
(12, 4, 'Nhìn bình yên quá đi.', 0, 0, '2024-05-02 14:20:10'),
(4, 2, 'Tone màu này hợp với mùa hè nhỉ.', 0, 0, '2024-05-02 15:05:00'),
(9, 8, 'Thích cách bạn canh ánh sáng.', 0, 0, '2024-05-03 09:12:25'),
(1, 10, 'Đỉnh cao thực sự!', 0, 0, '2024-05-03 10:30:15'),
(14, 5, 'Mê mẩn cái view này ghê.', 0, 0, '2024-05-03 11:55:00'),
(6, 7, 'Giá như mình cũng chụp được thế này.', 0, 0, '2024-05-03 16:40:20'),
(11, 3, 'Caption chất quá chủ thớt.', 0, 0, '2024-05-04 08:00:05'),
(8, 9, 'Rất có gu nha!', 0, 0, '2024-05-04 09:25:40'),
(13, 6, 'Ảnh nét căng đét.', 0, 0, '2024-05-04 13:10:12'),
(10, 1, 'Mãi mới thấy một tấm ưng ý.', 0, 0, '2024-05-04 14:50:00'),
(2, 8, 'Like mạnh cho tinh thần chia sẻ.', 0, 0, '2024-05-05 07:30:45'),
(15, 10, 'Góc này lạ mà đẹp nè.', 0, 0, '2024-05-05 10:15:30'),
(3, 4, 'Xin bí kíp chỉnh ảnh với ạ.', 0, 0, '2024-05-05 11:00:00'),
(5, 2, 'Đẹp quá bạn ơi ❤️', 0, 0, '2024-05-05 15:45:10');

-- ADD MORE COMMENT --
INSERT INTO comments (userId, imgId, content, deletedBy, isDeleted, createdAt) 
VALUES 
(2, 3, 'Góc này nhìn nghệ thuật thật sự!', 0, 0, '2024-05-06 08:00:00'),
(8, 1, 'Màu ảnh trong trẻo quá bạn ơi.', 0, 0, '2024-05-06 09:15:00'),
(11, 5, 'Cho mình xin địa điểm này được không?', 0, 0, '2024-05-06 10:30:00'),
(4, 7, 'Đẹp xuất sắc luôn! 🔥', 0, 0, '2024-05-06 11:45:00'),
(14, 2, 'Thích cách bạn bắt trọn khoảnh khắc này.', 0, 0, '2024-05-06 14:20:00'),
(1, 9, 'Nhìn như ảnh tạp chí ấy nhỉ.', 0, 0, '2024-05-06 15:50:00'),
(6, 10, 'Quá xịn xò cho một tấm hình.', 0, 0, '2024-05-07 07:10:00'),
(13, 4, 'Bình yên quá, ước gì được ở đây.', 0, 0, '2024-05-07 08:30:00'),
(9, 6, 'Mê mẩn cái tone màu này ghê.', 0, 0, '2024-05-07 09:45:00'),
(3, 8, 'Hóng bộ ảnh tiếp theo của bạn nha.', 0, 0, '2024-05-07 10:55:00'),
(15, 3, 'Góc chụp này lạ mà chất quá.', 0, 0, '2024-05-07 13:15:00'),
(5, 1, 'Đỉnh của chóp luôn ạ! ❤️', 0, 0, '2024-05-07 14:40:00'),
(12, 5, 'Cảm giác nhìn vào rất dễ chịu.', 0, 0, '2024-05-07 16:20:00'),
(7, 2, 'Kỹ thuật lấy nét tốt quá.', 0, 0, '2024-05-08 08:05:00'),
(10, 7, 'Cảnh đẹp, người chụp cũng có tâm.', 0, 0, '2024-05-08 09:25:00'),
(2, 9, 'Vote 10 điểm cho sự sáng tạo.', 0, 0, '2024-05-08 10:40:00'),
(8, 4, 'Ảnh nét căng đét luôn.', 0, 0, '2024-05-08 11:50:00'),
(11, 8, 'Màu film này đỉnh thật sự.', 0, 0, '2024-05-08 14:10:00'),
(4, 10, 'Không chê vào đâu được.', 0, 0, '2024-05-08 15:35:00'),
(14, 6, 'Nhìn là muốn đi du lịch ngay.', 0, 0, '2024-05-09 07:50:00'),
(1, 3, 'Cảm ơn bạn đã chia sẻ ảnh đẹp.', 0, 0, '2024-05-09 09:00:00'),
(6, 1, 'Góc chụp cực kỳ chuyên nghiệp.', 0, 0, '2024-05-09 10:20:00'),
(13, 5, 'Màu sắc rất hài hòa.', 0, 0, '2024-05-09 11:40:00'),
(9, 2, 'Tuyệt phẩm luôn bạn ơi! ✨', 0, 0, '2024-05-09 14:00:00'),
(3, 7, 'Thích phong cách của bạn ghê.', 0, 0, '2024-05-09 15:20:00'),
(15, 9, 'Tấm này làm hình nền thì hết bài.', 0, 0, '2024-05-10 08:30:00'),
(5, 4, 'Ánh sáng đẹp quá trời.', 0, 0, '2024-05-10 09:50:00'),
(12, 6, 'Đúng là nghệ thuật là ánh trăng lừa dối.', 0, 0, '2024-05-10 11:10:00'),
(7, 10, 'Quá đẳng cấp chủ thớt ơi.', 0, 0, '2024-05-10 13:45:00'),
(10, 8, 'Cứ thế phát huy nhé bạn! 👍', 0, 0, '2024-05-10 15:15:00');

-- MOCK UP DATA LIKES --
INSERT INTO likes (userId, imgId, deletedBy, isDeleted, createdAt) 
VALUES 
(1, 1, 0, 0, '2024-05-01 08:00:01'), (1, 2, 0, 0, '2024-05-01 08:05:10'), (1, 3, 0, 0, '2024-05-01 08:10:15'),
(2, 1, 0, 0, '2024-05-01 09:00:00'), (2, 4, 0, 0, '2024-05-01 09:15:22'), (2, 5, 0, 0, '2024-05-01 09:30:45'),
(3, 1, 0, 0, '2024-05-01 10:00:00'), (3, 2, 0, 0, '2024-05-01 10:10:00'), (3, 6, 0, 0, '2024-05-01 10:20:00'),
(4, 3, 0, 0, '2024-05-02 07:45:00'), (4, 7, 0, 0, '2024-05-02 08:00:00'), (4, 8, 0, 0, '2024-05-02 08:15:00'),
(5, 1, 0, 0, '2024-05-02 09:00:00'), (5, 9, 0, 0, '2024-05-02 09:30:00'), (5, 10, 0, 0, '2024-05-02 10:00:00'),
(6, 2, 0, 0, '2024-05-02 11:00:00'), (6, 4, 0, 0, '2024-05-02 11:30:00'), (6, 5, 0, 0, '2024-05-02 12:00:00'),
(7, 1, 0, 0, '2024-05-03 08:00:00'), (7, 6, 0, 0, '2024-05-03 08:20:00'), (7, 8, 0, 0, '2024-05-03 08:40:00'),
(8, 2, 0, 0, '2024-05-03 13:00:00'), (8, 3, 0, 0, '2024-05-03 13:30:00'), (8, 7, 0, 0, '2024-05-03 14:00:00'),
(9, 4, 0, 0, '2024-05-03 15:00:00'), (9, 5, 0, 0, '2024-05-03 15:30:00'), (9, 9, 0, 0, '2024-05-03 16:00:00'),
(10, 1, 0, 0, '2024-05-04 07:00:00'), (10, 10, 0, 0, '2024-05-04 07:30:00'), (10, 6, 0, 0, '2024-05-04 08:00:00'),
(11, 2, 0, 0, '2024-05-04 09:00:00'), (11, 3, 0, 0, '2024-05-04 09:45:00'), (11, 8, 0, 0, '2024-05-04 10:30:00'),
(12, 1, 0, 0, '2024-05-04 11:00:00'), (12, 4, 0, 0, '2024-05-04 11:15:00'), (12, 5, 0, 0, '2024-05-04 11:30:00'),
(13, 7, 0, 0, '2024-05-04 14:00:00'), (13, 9, 0, 0, '2024-05-04 14:30:00'), (13, 10, 0, 0, '2024-05-04 15:00:00'),
(14, 1, 0, 0, '2024-05-05 08:00:00'), (14, 2, 0, 0, '2024-05-05 08:15:00'), (14, 6, 0, 0, '2024-05-05 08:30:00'),
(15, 3, 0, 0, '2024-05-05 09:00:00'), (15, 4, 0, 0, '2024-05-05 09:20:00'), (15, 8, 0, 0, '2024-05-05 09:40:00'),
(1, 5, 0, 0, '2024-05-05 10:00:00'), (2, 9, 0, 0, '2024-05-05 10:15:00'), (3, 7, 0, 0, '2024-05-05 10:30:00'),
(4, 1, 0, 0, '2024-05-05 11:00:00'), (5, 4, 0, 0, '2024-05-05 11:30:00');

-- MOCK UP DATA BOOKMARK
INSERT INTO bookmarks (userId, imgId, deletedBy, isDeleted, createdAt) 
VALUES 
-- Các bản ghi cho userId 8 (Yêu cầu đặc biệt)
(8, 1, 0, 0, '2024-05-11 08:00:00'),
(8, 2, 0, 0, '2024-05-11 08:30:00'),
(8, 5, 0, 0, '2024-05-11 09:15:00'),
(8, 7, 0, 0, '2024-05-11 10:00:00'),
(8, 10, 0, 0, '2024-05-11 11:45:00'),

-- Các bản ghi cho các userId khác (1-15) và imgId (1-10)
(1, 3, 0, 0, '2024-05-11 12:00:00'),
(1, 8, 0, 0, '2024-05-11 13:20:00'),
(2, 4, 0, 0, '2024-05-12 07:15:00'),
(2, 6, 0, 0, '2024-05-12 08:40:00'),
(3, 1, 0, 0, '2024-05-12 09:50:00'),
(3, 10, 0, 0, '2024-05-12 10:30:00'),
(4, 2, 0, 0, '2024-05-12 14:10:00'),
(4, 5, 0, 0, '2024-05-12 15:55:00'),
(5, 7, 0, 0, '2024-05-13 08:20:00'),
(5, 9, 0, 0, '2024-05-13 09:45:00'),
(6, 1, 0, 0, '2024-05-13 10:15:00'),
(7, 3, 0, 0, '2024-05-13 11:30:00'),
(9, 4, 0, 0, '2024-05-14 07:45:00'),
(10, 6, 0, 0, '2024-05-14 08:50:00'),
(11, 2, 0, 0, '2024-05-14 09:20:00'),
(11, 8, 0, 0, '2024-05-14 10:40:00'),
(12, 5, 0, 0, '2024-05-14 13:10:00'),
(12, 10, 0, 0, '2024-05-14 14:25:00'),
(13, 1, 0, 0, '2024-05-15 08:10:00'),
(13, 9, 0, 0, '2024-05-15 09:30:00'),
(14, 3, 0, 0, '2024-05-15 10:50:00'),
(14, 7, 0, 0, '2024-05-15 11:15:00'),
(15, 4, 0, 0, '2024-05-15 14:00:00'),
(15, 6, 0, 0, '2024-05-15 15:40:00'),
(1, 10, 0, 0, '2024-05-15 16:20:00');
