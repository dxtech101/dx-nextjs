"use client";

const HeadingSection = () => (
    <div className="mb-12 md:mb-24 text-center max-w-6xl mx-auto">
        <h2 className="mb-2 font-semibold text-6xl mx-auto text-black font-heading">
            Want to find out more about our services?
        </h2>
        <p className="text-lg text-gray-500">
            Your journey to hire smart minded people starts here.
        </p>
    </div>
);

const AddressSection = () => (
    <div className="relative w-full md:w-1/3 p-3">
        <iframe
            src="https://www.google.com/maps/embed?..."
            className='w-full h-full rounded-3xl border-2 border-neutral-100'
            loading="lazy"
        ></iframe>
        <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="flex flex-col rounded-2xl border-2 border-neutral-200 justify-center items-start w-full p-5 font-semibold text-white bg-white">
                <h4 className="mb-2 font-semibold text-neutral-600 tracking-tight font-heading">Address</h4>
                <h4 className="text-xl font-medium tracking-tight font-heading text-black">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, fugit.
                </h4>
            </div>
        </div>
    </div>
);

const ContactForm = () => (
    <div className="w-full md:flex-1 p-3">
        <div className="h-full p-10 pb-16 bg-white rounded-3xl border-2 border-neutral-100">
            <h4 className="mb-10 text-5xl font-medium tracking-tight font-heading text-black">Send a message</h4>
            <form className="max-w-2xl mx-auto">
                {['Full name', 'Email', 'Phone'].map((label) => (
                    <div key={label} className="mb-4 border-t border-neutral-100 flex flex-wrap">
                        <div className="w-full md:w-4/12 pt-4 md:pb-4 pr-20 border-r border-neutral-100">
                            <p className="text-xl font-medium tracking-tight text-black">{label}</p>
                        </div>
                        <div className="w-full md:flex-1 py-4 md:pl-8">
                            <input
                                className="block w-full text-xl text-neutral-600 font-medium placeholder-neutral-200 outline-none"
                                type="text"
                                placeholder={label}
                            />
                        </div>
                    </div>
                ))}
                <div className="mb-6 border-t border-neutral-100">
                    <p className="text-xl font-medium tracking-tight text-black">Select who you are?</p>
                    {['Developer', 'Company looking for Developers', 'Company listing developers'].map((option) => (
                        <label key={option} className="relative flex items-center gap-4 py-2">
                            <input className="h-8 w-8 rounded-full" type="radio" name="role" />
                            <span className="text-neutral-500 text-lg font-medium tracking-tight">{option}</span>
                        </label>
                    ))}
                </div>
                <button className="h-16 p-5 font-semibold text-lg text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg" type="submit">
                    Send a message
                </button>
            </form>
        </div>
    </div>
);

const ContactInfo = ({ label, value }: any) => (
    <div className="w-full md:w-1/2 p-3">
        <div className="h-full p-10 bg-white rounded-3xl border-2 border-neutral-100">
            <h4 className="mb-2 font-semibold text-neutral-600 tracking-tight font-heading">{label}</h4>
            <h4 className="text-5xl font-medium tracking-tight font-heading">{value}</h4>
        </div>
    </div>
);

const ContactPage = () => (
    <section className="py-12 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
            <HeadingSection />
            <div className="flex flex-wrap -m-3">
                <AddressSection />
                <ContactForm />
                <ContactInfo label="Phone number" value="+41 337003 00" />
                <ContactInfo label="Email" value="hi@contactmigra" />
            </div>
        </div>
    </section>
);

export default ContactPage;
