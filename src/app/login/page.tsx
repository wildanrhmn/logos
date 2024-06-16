import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col gap-4 bg-white rounded-3xl shadow-loginform py-12 px-7 min-w-[450px] min-h-[500px]">
                <div className="mb-5 flex flex-col gap-7">
                    <h1 className="text-2xl font-bold text-center text-white bg-logo py-3 mx-24">
                        LOGOS
                    </h1>
                    <h3 className="text-2xl font-bold text-center text-border-dark tracking-wider">
                        SELAMAT DATANG
                    </h3>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}
