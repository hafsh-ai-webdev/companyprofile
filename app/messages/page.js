import { messages } from "@/lib/db";
import { deleteMessageAction } from "./actions";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Belum ada pesan masuk.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{msg.name} — {msg.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">{msg.message}</p>
              </div>

              {/* Tombol Hapus memanggil Server Action deleteMessageAction */}
              <form action={deleteMessageAction.bind(null, msg.id)}>
                <Button type="submit" variant="destructive" size="sm">
                  Hapus
                </Button>
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
}