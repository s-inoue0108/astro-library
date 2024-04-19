import fs from "fs";
import satori from "satori";
import sharp from "sharp";

export const getOgImage = async (text: string): Promise<Buffer> => {
	const fontRegular = fs.readFileSync("src/fonts/Montserrat-Regular.ttf");
	const fontBold = fs.readFileSync("src/fonts/NotoSansJP-Bold.ttf");

	const svg = await satori(
		<main
			style={{
				height: "100%",
				width: "100%",
				backgroundColor: "#444",
				color: "#fff",
				padding: "10px",
			}}
		>
			<section>
				<h1 style={{ fontSize: "40px" }}>{text}</h1>
			</section>
		</main>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Montserrat",
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

	return await sharp(Buffer.from(svg)).png().toBuffer();
};
