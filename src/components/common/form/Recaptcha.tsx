import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactForm from "./ContactForm";

export default function Recaptcha() {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY} language="ja">
			<ContactForm />
		</GoogleReCaptchaProvider>
	);
}
