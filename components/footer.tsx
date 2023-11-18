import React from "react";

export default function Footer() {
	return (
		<footer className="bg-[#691311] dark:bg-[#bdba9f] text-[#d6d5c9] dark:text-[#a22c29] p-4 mt-auto">
			<div className="container mx-auto text-center">
				<p className="text-sm">
					© 2023 BellaBites | Designed with{" "}
					<span role="img" aria-label="Heart">
						❤️
					</span>{" "}
					for <a className="font-bold" href="https://www.instagram.com/princessbella.k/" target="_blank">Bella</a> by <a className="font-bold" href="https://www.linkedin.com/in/abhiraman-kuntimaddi/" target="_blank">Abhiraman Kuntimadi</a>
				</p>
			</div>
		</footer>
	);
}
