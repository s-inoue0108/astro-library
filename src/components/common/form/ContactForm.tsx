import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";

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

		try {
			const response = await fetch(import.meta.env.PUBLIC_NEWT_CONTACT_FORM_ENDPOINT, {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json",
				},
			});

			if (response.ok) {
				// router.push('/thanks')
			} else {
				// router.push('/error')
			}
		} catch (err) {
			//   router.push('/error')
			throw err;
		}
	});

	return (
		<>
			<h1>Contact us</h1>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">Name*</label>
				<input id="name" {...register("name", { required: "Name is required" })} aria-describedby="error-name-required" />
				{errors?.name && (
					<span id="error-name-required" aria-live="assertive">
						{errors.name.message}
					</span>
				)}
				<label htmlFor="email">Email</label>
				<input id="email" {...register("email")} />
				<label htmlFor="content">Message</label>
				<textarea id="content" {...register("content")}></textarea>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
