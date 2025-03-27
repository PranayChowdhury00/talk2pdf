import { FC } from "react";

const Header: FC = () => {
    return (
        <header className="text-center py-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
                Extract Text from PDFs Instantly
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
                Transform your PDF documents into editable text with precision
                and speed.
            </p>
        </header>
    );
};

export default Header;
