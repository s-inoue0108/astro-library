import fs from "fs";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

export const getOgImageResponse = async (text: string): Promise<Response> => {
	const fontRegular = fs.readFileSync("src/fonts/NotoSansJP-Regular.ttf");
	const fontBold = fs.readFileSync("src/fonts/NotoSansJP-Bold.ttf");
	const authorImage = await fetch(
		"https://si-library.assets.newt.so/v1/b086d97b-f8fb-43db-bb87-26212a3c32f4/portfolio-favicon.png"
	).then((res) => res.arrayBuffer());

	const width = 1200;
	const height = 630;

	const svg = await satori(
		<main
			style={{
				height: "100%",
				width: "100%",
				backgroundImage: "linear-gradient(90deg, #fbbf24, #fb923c 50%, #fb7185)",
				position: "relative",
			}}
		>
			<section
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					height: "90%",
					width: "90%",
					backgroundColor: "rgba(0, 11, 41, 0.3)",
					borderRadius: "16px",
					padding: "20px 5%",
				}}
			>
				<h1
					style={{
						width: "100%",
						color: "#ffffff",
						fontSize: "70px",
						fontWeight: 700,
						letterSpacing: "2px",
					}}
				>
					{text}
				</h1>
				<hr
					style={{
						position: "absolute",
						left: "70px",
						bottom: "90px",
						width: "940px",
						border: "solid 1px #cbd5e1",
					}}
				/>
				<img
					/* @ts-ignore */
					src={authorImage}
					width={48}
					height={48}
					style={{
						position: "absolute",
						bottom: "24px",
						left: "81px",
						borderRadius: "9999px",
					}}
				/>
				<p
					style={{
						position: "absolute",
						bottom: "8px",
						left: "148px",
						color: "#cbd5e1",
						fontSize: "32px",
						fontWeight: 700,
					}}
				>
					Shota Inoue
				</p>
				<p
					style={{
						position: "absolute",
						bottom: "10px",
						right: "81px",
						color: "#cbd5e1",
						fontSize: "24px",
						fontWeight: 400,
					}}
				>
					{import.meta.env.APP_URL}
				</p>
			</section>
		</main>,
		{
			width,
			height,
			fonts: [
				{
					name: "Noto Sans JP",
					data: fontRegular,
					weight: 400,
					style: "normal",
				},
				{
					name: "Noto Sans JP",
					data: fontBold,
					weight: 700,
					style: "normal",
				},
			],
		}
	);

	const resvg = new Resvg(svg, {
		font: {
			loadSystemFonts: false,
		},
		fitTo: {
			mode: "width",
			value: width,
		},
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			"Content-Type": "image/png",
		},
	});
};
