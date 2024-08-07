
window.addEventListener('DOMContentLoaded', function () {
    // Vị trí cuộn đến (tính theo pixel)
    var scrollToPosition = 525;

    // Kiểm tra xem người dùng đã cuộn chuột chưa
    var hasScrolled = false;

    window.addEventListener('scroll', function () {
        if (!hasScrolled) {
            // Cuộn đến vị trí chỉ định
            window.scrollTo(0, scrollToPosition);
            hasScrolled = true;

        }
    });
});