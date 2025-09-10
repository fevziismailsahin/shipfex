import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const bgImage = PlaceHolderImages.find((img) => img.id === "login-bg");

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="mx-auto grid w-full max-w-md gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <Icons.logo className="h-8 w-8" />
              <span className="text-2xl font-bold">ShipFex</span>
            </Link>
            {children}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        )}
      </div>
    </div>
  );
}
