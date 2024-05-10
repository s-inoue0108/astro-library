import fs from "fs";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { Tag } from "../../../lib/newt/types";

export const getOgImageResponse = async (title: string, tags?: Tag[]): Promise<Response> => {
	const montserratRegular = fs.readFileSync("src/fonts/Montserrat-Regular.ttf");
	const montserratBold = fs.readFileSync("src/fonts/Montserrat-Bold.ttf");
	const notoSansJPBold = fs.readFileSync("src/fonts/NotoSansJP-Bold.ttf");
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
					borderRadius: "32px",
					padding: "20px 5%",
				}}
			>
				<h1
					style={{
						fontFamily: "Noto Sans JP",
						width: "100%",
						color: "#ffffff",
						fontSize: "70px",
						fontWeight: 700,
						letterSpacing: "2px",
					}}
				>
					{title}
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
						bottom: "20px",
						left: "72px",
						borderRadius: "9999px",
					}}
				/>
				<p
					style={{
						fontFamily: "Montserrat",
						position: "absolute",
						bottom: "8px",
						left: "128px",
						color: "#cbd5e1",
						fontSize: "32px",
						fontWeight: 400,
					}}
				>
					Shota Inoue
				</p>
				<div
					style={{
						fontFamily: "Montserrat",
						position: "absolute",
						bottom: "6px",
						right: "72px",
						color: "#cbd5e1",
						fontSize: "24px",
						fontWeight: 700,
						display: "flex",
						flexDirection: "row-reverse",
						gap: "16px",
						alignItems: "center",
					}}
				>
					{tags &&
						tags.length > 0 &&
						tags.slice(0, 3).map((tag) => {
							return <p>{`#${tag.name}`}</p>;
						})}
				</div>
			</section>
		</main>,
		{
			width,
			height,
			fonts: [
				{
					name: "Montserrat",
					data: montserratRegular,
					weight: 400,
					style: "normal",
				},
				{
					name: "Montserrat",
					data: montserratBold,
					weight: 700,
					style: "normal",
				},
				{
					name: "Noto Sans JP",
					data: notoSansJPBold,
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
