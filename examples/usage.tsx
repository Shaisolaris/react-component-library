/**
 * Example: How to use @solaris/ui components in your app.
 * 
 * npm install @solaris/ui
 */
import React from "react";
import { Button, Modal, Dropdown, Tabs, Input, Switch, Badge, Avatar } from "@solaris/ui";
import { useToggle, useDebounce, useClickOutside } from "@solaris/ui";

export function ExampleApp() {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Component Library Demo</h1>

      {/* Button variants */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button variant="primary" onClick={toggleModal}>Open Modal</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button isLoading>Loading...</Button>
      </div>

      {/* Input with debounce */}
      <Input 
        placeholder="Search (debounced 300ms)..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <p>Debounced value: {debouncedSearch}</p>

      {/* Badge + Avatar */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "16px 0" }}>
        <Avatar name="Sarah Chen" />
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="error">Offline</Badge>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Settings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Overview content</Tabs.Content>
        <Tabs.Content value="tab2">Settings content</Tabs.Content>
      </Tabs>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={toggleModal} title="Example Modal">
        <p>This is a headless modal. Style it with your own CSS.</p>
        <Button onClick={toggleModal}>Close</Button>
      </Modal>
    </div>
  );
}
