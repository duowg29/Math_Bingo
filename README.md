# Game project follow the below steps

1. Tạo file .gitmodules với nội dung sau
[submodule "mct-common"]
	path = mct-common
	url = https://github.com/YoloGameStudio/mct-common.git
	branch = release
2. git submodule update --init ==> Chạy để khởi tạo
3. git submodule update --recursive --remote  => Chạy để lấy dữ liệu mới