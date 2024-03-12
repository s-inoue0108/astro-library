// CSS
import style from "./ContactForm.module.scss";

import { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";

// SVG
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";

type FormValues = {
	name: string;
	email: string;
	content: string;
	googleReCaptchaToken: string;
};

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({ mode: "onChange" });

	const { executeRecaptcha } = useGoogleReCaptcha();

	const onSubmit = handleSubmit(async (data) => {
		if (!executeRecaptcha) return;
		const token = await executeRecaptcha("submit");
		data.googleReCaptchaToken = token;

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		const isSubmit = confirm("この内容でフォームを送信しますか？");

		if (isSubmit) {
			try {
				const response = await fetch(import.meta.env.PUBLIC_NEWT_CONTACT_FORM_ENDPOINT, {
					method: "POST",
					body: formData,
					headers: {
						Accept: "application/json",
					},
				});

				if (response.ok) {
					alert("内容を送信しました。確認メールをお送りいたしますので、メールボックスをご確認下さい。");
					useEffect(() => {
						reset();
					}, [reset]);
				} else {
					alert("内容が正常に送信されませんでした。");
				}
			} catch (err) {
				console.error(err);
			}
		}
	});

	const discard = () => {
		const isDiscard = confirm("お問い合わせ内容をリセットしますか？");

		if (isDiscard) {
			reset({ content: "" });
		}
	};

	return (
		<>
			<form onSubmit={onSubmit} className={style.contactForm}>
				<label htmlFor="name" className={style.contactFormLabel}>
					お名前
				</label>
				{errors?.name && (
					<span id="error-name-required" aria-live="assertive" className={style.contactFormErrorMsg}>
						{errors.name.message}
					</span>
				)}
				<input id="name" {...register("name", { required: "未入力です", maxLength: { value: 50, message: "最大50文字です" } })} aria-describedby="error-name-required" className={style.contactFormInput} />
				<label htmlFor="email" className={style.contactFormLabel}>
					Eメールアドレス
				</label>
				{errors?.email && (
					<span id="error-email-required" aria-live="assertive" className={style.contactFormErrorMsg}>
						{errors.email.message}
					</span>
				)}
				<input id="email" {...register("email", { required: "未入力です", maxLength: { value: 100, message: "最大100文字です" }, pattern: { value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, message: "無効な形式です" } })} className={style.contactFormInput} />
				<label htmlFor="content" className={style.contactFormLabel}>
					お問い合わせ内容
					<button type="button" onClick={discard} className={style.contactFormDiscardBtn}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox={svgViewBoxes.deleteLeft}>
							<path d={svgPaths.deleteLeft} />
						</svg>
					</button>
				</label>
				{errors?.content && (
					<span id="error-content-required" aria-live="assertive" className={style.contactFormErrorMsg}>
						{errors.content.message}
					</span>
				)}
				<textarea id="content" {...register("content", { required: "未入力です", maxLength: { value: 1000, message: "最大1000文字です" } })} className={style.contactFormTextarea} />
				<button type="submit" className={style.contactFormSubmitBtn}>
					確認して送信
				</button>
			</form>
		</>
	);
}
