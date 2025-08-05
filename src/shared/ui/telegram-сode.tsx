import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@shared/ui/dialog";
import {Button} from "@shared/ui/button";
import {Send} from "lucide-react";
import {useTheme} from "next-themes";

export function TelegramCode() {
  const { resolvedTheme, systemTheme } = useTheme();

  const theme = resolvedTheme || systemTheme;
  const isDark = theme === "dark";
  const src = isDark
    ? "/images/telegram-qr-code-dark.png"
    : "/images/telegram-qr-code.png";

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost"><Send />Зарегистрироваться</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-2">Зарегистрируйтесь через Telegram</DialogTitle>
            <DialogDescription>
              <img src={src} alt="telegram qr code"/>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
)
}