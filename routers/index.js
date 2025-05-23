var express = require('express');
var router = express.Router();
var firstImage = require('../modules/firstimage');
var ChuDe = require('../models/chude');
var BaiViet = require('../models/baiviet');

// GET: Trang chủ
router.get('/', async (req, res) => {
	// lấy chuyên mục hiển thị vào menuba
	var cm = await ChuDe.find();
	
	//lấy 12 bài viết mới nhất
	var bv = await BaiViet.find({ KiemDuyet: 1})
		.sort({ NgayDang: -1 })
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(12).exec();
		
	//lấy 3 bài viết xem nhiều nhất	
	var xnn = await BaiViet.find({ KiemDuyet: 1})
		.sort({ LuotXem: -1 })
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(3).exec();	
	
	res.render('index', {
		title: 'Trang Chủ',
		chuyenmuc: cm,
		baiviet: bv,
		xemnhieunhat: xnn,
		firstImage: firstImage
	});
	
});

// GET: Lấy các bài viết cùng mã chủ đề
router.get('/baiviet/chude/:id', async (req, res) => {
	
	var id = req.params.id;

	var cm = await ChuDe.find();
	
	var cd = await ChuDe.findById(id);
	
	//lấy 12 bài viết mới nhất
	var bv = await BaiViet.find({ KiemDuyet: 1, ChuDe: id })
		.sort({ NgayDang: -1 })
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(12).exec();
	
	//lấy 3 bài viết xem nhiều nhất
	var xnn = await BaiViet.find({ KiemDuyet: 1, ChuDe: id })
		.sort({ LuotXem: -1 })
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(3).exec();	
	
	res.render('baiviet_chude', {
		title: 'Bài Viết Cùng Chuyên Mục',
		chuyenmuc: cm,
		chude: cd,
		baiviet: bv,
		xemnhieunhat: xnn,
		firstImage: firstImage
	});
});

// GET: Xem bài viết
router.get('/baiviet/chitiet/:id', async (req, res) => {
	var id = req.params.id;

	var cm = await ChuDe.find();
	
	var bv = await BaiViet.findById(id)
		.populate('ChuDe')
		.populate('TaiKhoan').exec();
	

	//lấy 3 bài viết xem nhiều nhất
	var xnn = await BaiViet.find({ KiemDuyet: 1})
		.sort({ LuotXem: -1 })
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(3).exec();	
	
	res.render('baiviet_chitiet', {
		title: 'Bài Viết Cùng Chuyên Mục',
		chuyenmuc: cm,
		baiviet: bv,
		xemnhieunhat: xnn,
		firstImage: firstImage
	});
});

// GET: Tin mới nhất
router.get('/tinmoi', async (req, res) => {
	res.render('tinmoinhat', {
		title: 'Tin mới nhất'
	});
});

// POST: Kết quả tìm kiếm
router.post('/timkiem', async (req, res) => {
	var tukhoa = req.body.tukhoa;
	
	// Xử lý tìm kiếm bài viết
	var bv = [];
	
	res.render('timkiem', {
		title: 'Kết quả tìm kiếm',
		baiviet: bv,
		tukhoa: tukhoa
	});
});

// GET: Lỗi
router.get('/error', async (req, res) => {
	res.render('error', {
		title: 'Lỗi'
	});
});

// GET: Thành công
router.get('/success', async (req, res) => {
	res.render('success', {
		title: 'Hoàn thành'
	});
});

module.exports = router;