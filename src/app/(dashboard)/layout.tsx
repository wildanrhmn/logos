
import Header from "@/components/Header";

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <main className="py-10">{children}</main>
        </div>
    );
}