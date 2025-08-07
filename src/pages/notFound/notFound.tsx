import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import {Link, useNavigate} from "react-router-dom";
import {ArrowLeftCircle, House} from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate()

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate("/home")
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full p-8 text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-9xl leading-none">404</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Страница не найдена
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-muted-foreground">
            К сожалению, такой страницы не существует или она была перемещена.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/home">
                <House className="mr-2 h-4 w-4" />
                На главную
              </Link>
            </Button>
            <Button variant="default" onClick={goBack}>
              <ArrowLeftCircle className="mr-2 h-4 w-4" />
              Вернуться
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}