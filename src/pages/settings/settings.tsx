import { useCallback, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs.tsx";
import { usePageCrumbs } from "@features/usePageCrumbs";
import { TokenTelegramFormCard } from "@/widgets/tokenTelegramFormCard";

export function SettingsPage() {
  usePageCrumbs("Настройки");

  // Храним текущее значение токена локально (по необходимости можно заменить на Redux/Query)
  const [token, setToken] = useState<string>("");

  // Заглушка: вызывается на любое изменение поля токена
  const handleTokenChange = useCallback((next: string) => {
    console.log("[Settings] Telegram bot token changed:", next);
    setToken(next);
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Настройки</h1>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="main">Основное</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="mt-4">
          <TokenTelegramFormCard
            value={token}
            onChange={handleTokenChange}
          />
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          {/* Пока пусто, заполним позже */}
          <div className="text-muted-foreground">Здесь будут настройки интеграций.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
