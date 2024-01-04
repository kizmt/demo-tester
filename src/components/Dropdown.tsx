import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from "@nextui-org/react";
import {
  LuStickyNote,
  LuCopyCheck,
  LuClipboardEdit,
  LuDelete,
} from "react-icons/lu";

export default function MyDropdown() {
  return (
    <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200",
        content:
          "py-1 px-1 border border-primary-100 bg-background-100 from-white to-default-200 dark:background-primary-100 dark:border-primary-100",
      }}
    >
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions">
          <DropdownItem
            key="new"
            shortcut="⌘N"
            description="Create a new file"
            startContent={<LuStickyNote className="text-xl text-default-500" />}
          >
            New file
          </DropdownItem>
          <DropdownItem
            key="copy"
            shortcut="⌘C"
            description="Copy the file link"
            startContent={<LuCopyCheck className="text-xl text-default-500" />}
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="edit"
            shortcut="⌘⇧E"
            description="Allows you to edit the file"
            startContent={<LuClipboardEdit className="text-xl text-default-500" />}
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            shortcut="⌘⇧D"
            description="Permanently delete the file"
            startContent={<LuDelete className="text-xl text-danger" />}
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
