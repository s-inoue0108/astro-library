import "swiper/css";
import styles from "./ImageWindow.module.scss";

import { useRef } from "react";
import { Pagination, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { NewtImageProps } from "../../lib/newt/types";

import { svgPaths, svgViewBoxes } from "../../lib/svg/paths";
import type { Swiper as SwiperType } from "swiper/types";

interface Props {
	images: NewtImageProps[];
}

const ImageWindow = (props: Props) => {
	const swiperRef = useRef<SwiperType>();
	const { images } = props;
	return (
		<div className={styles.frame}>
			<div className={styles.laptopBtns}>
				<div className={`${styles.laptopBtn} ${styles.red}`} />
				<div className={`${styles.laptopBtn} ${styles.yellow}`} />
				<div className={`${styles.laptopBtn} ${styles.green}`} />
			</div>
			<Swiper
				loop={true}
				centeredSlides={true}
				slidesPerView={1}
				pagination={{
					type: "bullets",
				}}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
				modules={[Pagination, Mousewheel]}
			>
				{images.map((img) => (
					<SwiperSlide key={img._id}>
						<img src={img.src} alt={img.altText} className={styles.image} />
					</SwiperSlide>
				))}
			</Swiper>
			<div className={styles.prevBtn}>
				<button type="button" onClick={() => swiperRef.current!.slidePrev()}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox={svgViewBoxes.chevronLeft}>
						<path d={svgPaths.chevronLeft}></path>
					</svg>
				</button>
			</div>
			<div className={styles.nextBtn}>
				<button type="button" onClick={() => swiperRef.current!.slideNext()}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox={svgViewBoxes.chevronRight}>
						<path d={svgPaths.chevronRight}></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default ImageWindow;
