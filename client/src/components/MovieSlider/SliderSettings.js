export const settings = {
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    adaptiveHeight: true,
    dots: true,

    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1250,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 750,
            settings: {
                slidesToShow: 1
            }
        }
    ]
};
