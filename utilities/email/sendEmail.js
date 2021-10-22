import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { compile } from "html-to-text";

const sendEmail = async (email, subject, payload, template) => {
	console.log({ email, subject, payload, template });
	console.log(process.env.EMAIL_HOST);
	console.log(process.env.EMAIL_USERNAME);
	console.log(process.env.EMAIL_PASSWORD);
	console.log(process.env.FROM_EMAIL);
	try {
		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: 587,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
			},
		});

		const dirName = `${process.cwd()}/utilities/email`;
		const source = fs.readFileSync(path.join(dirName, template), "utf8");
		const compiledTemplate = handlebars.compile(source);

		const options = () => {
			return {
				from: process.env.FROM_EMAIL,
				to: email,
				subject: subject,
				html: compiledTemplate(payload),
			};
		};
		// Send email
		transporter.sendMail(options(), (error, info) => {
			console.log(info);
			if (error) {
				return error;
			} else {
				return res.status(200).json({
					success: true,
				});
			}
		});
	} catch (error) {
		return error;
	}
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

export default sendEmail;
