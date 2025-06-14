import Image from 'next/image';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100  flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">

                <div className="mb-8 relative">
                    <div className="relative inline-block">
                        <Image
                            src="notFound.svg"
                            alt="404 Not Found Illustration"
                            height={100}
                            width={100}
                            className="w-80 h-64 mx-auto object-contain filter dark:brightness-75 dark:contrast-125"
                        />
                    </div>
                </div>

                <div className="mb-8 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Page Not Found
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                        Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default NotFoundPage;