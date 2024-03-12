import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Recaptcha({ children }: { children: React.ReactNode }) {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY} language="ja">
			{children}
		</GoogleReCaptchaProvider>
	);
}
