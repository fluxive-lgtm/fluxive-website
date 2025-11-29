import { BlogPost } from "@/data/blogData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

interface AuthorBioProps {
    author: BlogPost["author"];
}

export default function AuthorBio({ author }: AuthorBioProps) {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 my-12 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <Avatar className="w-20 h-20 border-2 border-white shadow-md">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback className="bg-primary-100 text-primary-700 text-xl font-bold">
                    {author.name.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">Written by {author.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-3">{author.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Expert in hotel IT infrastructure and digital marketing. Solved Wi-Fi and marketing challenges for Hotel Koffieboontje in Bruges. Currently helping businesses grow through technology.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <Button variant="outline" size="sm" className="h-8 gap-2" asChild>
                        <a href="https://www.linkedin.com/in/aman-yadav-b1a76a24a" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-3 h-3" /> LinkedIn
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-2" asChild>
                        <a href="mailto:info@fluxive.be">
                            <Mail className="w-3 h-3" /> Email
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
