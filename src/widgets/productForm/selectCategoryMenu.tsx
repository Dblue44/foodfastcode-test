import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@shared/ui/dropdown-menu.tsx";
import {Button} from "@shared/ui/button.tsx";
import {ScrollArea} from "@shared/ui/scroll-area.tsx";
import type {SelectCategoryMenuProps} from "@widgets/productForm";

export function SelectCategoryMenu({
  form,
  categories,
  selected
}: SelectCategoryMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between"
          disabled={form.formState.isSubmitting || (categories?.length ?? 0) === 0}
        >
          {selected ? selected.name : "Выберите категорию"}
          <span className="opacity-60">▾</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] p-0">
        <ScrollArea className="max-h-80">
          {categories?.length ? (
            categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onSelect={(e) => {
                  e.preventDefault();
                  form.setValue("categoryId", category.id, {shouldValidate: true, shouldDirty: true});
                }}
                className="cursor-pointer"
              >
                {category.name}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">
              Не добавлено ни одной категории
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}