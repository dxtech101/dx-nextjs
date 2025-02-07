import { ScrollText } from 'lucide-react'
import React from 'react'

const TermsAndConditions = () => {
    return (
        <div className="bg-gray-100 px-10 pb-10 rounded-lg">
            <div className='flex flex-col py-10 items-center justify-center gap-4'>
                <ScrollText className='w-20 h-20 text-gray-500 text-4xl' />
                <h1 className="text-2xl font-bold text-center uppercase text-gray-800 tracking-wide space-x-6 whitespace-nowrap">Terms and Conditions</h1>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
                Welcome to <span className="font-medium">DX Digital</span>! These terms and conditions outline the rules and regulations for using our website, located at
                <span className="font-medium">[Website URL]</span>.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use
                <span className="font-medium">[Website Name]</span> if you do not agree to all the terms and conditions stated on this page.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">2. Intellectual Property Rights</h2>
            <p className="text-gray-600 leading-relaxed">
                Unless otherwise stated, <span className="font-medium">DX Digital</span> owns the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this material for your own personal use, subject to restrictions set in these terms and conditions.
            </p>
            <ul className="list-disc ml-6 mt-4 text-gray-600">
                <li>Republish material from <span className="font-medium">[Website Name]</span></li>
                <li>Sell, rent, or sub-license material from <span className="font-medium">[Website Name]</span></li>
                <li>Reproduce, duplicate, or copy material from <span className="font-medium">[Website Name]</span></li>
                <li>Redistribute content from <span className="font-medium">[Website Name]</span> without explicit permission</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">3. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed">
                By using our website, you agree to:
            </p>
            <ul className="list-disc ml-6 mt-4 text-gray-600">
                <li>Provide accurate and up-to-date information.</li>
                <li>Use the website in a lawful manner and not engage in fraudulent activities.</li>
                <li>Respect the privacy and rights of other users.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">4. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
                <span className="font-medium">DX Digital</span> will not be held responsible for any damages that arise from the use of our website. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">5. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for the content or practices of these external sites.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">6. Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
                Your use of this website is also governed by our{" "}
                {/* <a href="[Link to Privacy Policy]" className="text-blue-600 underline">{" "}Privacy Policy</a>,  */}
                which explains how we collect, use, and protect your data.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">7. Modifications to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
                <span className="font-medium">DX Digital</span> reserves the right to update or modify these terms at any time. Continued use of the website after changes indicates your acceptance of the new terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">8. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of <span className="font-medium">[Your Country/State]</span>, and you submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">9. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            {/* <ul className="list-none mt-4 text-gray-600">
                            <li>Email: <a href="mailto:[Email Address]" className="text-blue-600 underline">[Email Address]</a></li>
                            <li>Phone: <a href="tel:[Phone Number]" className="text-blue-600 underline">[Phone Number]</a></li>
                        </ul> */}
        </div>
    )
}

export default TermsAndConditions
