import { useState } from "react";

// ── Palette & helpers ──────────────────────────────────────────────────────
const C = {
  teal: "#00897B",
  tealDark: "#00695C",
  tealLight: "#B2DFDB",
  tealSoft: "#E0F2F1",
  orange: "#FF7043",
  orangeLight: "#FFE0D7",
  white: "#FFFFFF",
  bg: "#F4FAF9",
  card: "#FFFFFF",
  text: "#1A2E2C",
  textSoft: "#5A7A77",
  border: "#D0EBEA",
  red: "#E53935",
  green: "#43A047",
  blue: "#1E88E5",
  purple: "#8E24AA",
  yellow: "#F9A825",
};

const shadow = "0 2px 12px rgba(0,137,123,0.10)";
const shadowMd = "0 4px 24px rgba(0,137,123,0.15)";

// ── Mock Data ──────────────────────────────────────────────────────────────
const INIT_PETS = [
  {
    id: 1, name: "Luna", species: "Perro", breed: "Golden Retriever",
    age: "3 años", weight: "28 kg", color: "Dorado", sex: "Hembra",
    owner: "María García", ownerPhone: "3001234567", ownerEmail: "maria@email.com",
    ownerAddress: "Calle 45 #12-34, Bogotá", chip: "985112345678901",
    avatar: "🐕", avatarColor: "#FFF3E0",
  },
  {
    id: 2, name: "Michi", species: "Gato", breed: "Persa", age: "2 años",
    weight: "4.5 kg", color: "Blanco", sex: "Macho",
    owner: "Carlos López", ownerPhone: "3109876543", ownerEmail: "carlos@email.com",
    ownerAddress: "Av. 80 #56-78, Medellín", chip: "985198765432100",
    avatar: "🐈", avatarColor: "#F3E5F5",
  },
  {
    id: 3, name: "Rex", species: "Perro", breed: "Pastor Alemán", age: "5 años",
    weight: "35 kg", color: "Negro/Café", sex: "Macho",
    owner: "Ana Martínez", ownerPhone: "3157654321", ownerEmail: "ana@email.com",
    ownerAddress: "Cra 7 #89-10, Cali", chip: "985112312312300",
    avatar: "🐕‍🦺", avatarColor: "#E8F5E9",
  },
];

const INIT_HISTORY = [
  {
    id: 1, petId: 1, date: "2024-03-15", vet: "Dr. Pérez", reason: "Control anual",
    diagnosis: "Paciente sano. Vacunas al día.", treatment: "Desparasitación interna y externa.",
    weight: "28 kg", temp: "38.5°C", hr: "80 lpm", notes: "Próxima cita en 6 meses.",
    attachments: [{ name: "Rx_torax.pdf", type: "pdf" }, { name: "foto_piel.jpg", type: "img" }],
    labs: [101],
  },
  {
    id: 2, petId: 1, date: "2024-01-10", vet: "Dra. Ruiz", reason: "Vómitos frecuentes",
    diagnosis: "Gastritis leve", treatment: "Metronidazol 250mg cada 12h por 5 días. Dieta blanda.",
    weight: "27.5 kg", temp: "38.8°C", hr: "85 lpm", notes: "Control en 1 semana.",
    attachments: [], labs: [102],
  },
  {
    id: 3, petId: 2, date: "2024-03-20", vet: "Dr. Pérez", reason: "Dermatitis",
    diagnosis: "Dermatitis alérgica", treatment: "Prednisona 5mg diaria por 7 días.",
    weight: "4.5 kg", temp: "38.2°C", hr: "120 lpm", notes: "Evitar alérgenos.",
    attachments: [{ name: "biopsia.pdf", type: "pdf" }], labs: [103],
  },
];

const INIT_LABS = [
  {
    id: 101, petId: 1, date: "2024-03-15", type: "Sangre", status: "Completado",
    vet: "Dr. Pérez",
    params: [
      { name: "Hemoglobina", value: "14.2", unit: "g/dL", ref: "12–18", ok: true },
      { name: "Hematocrito", value: "42", unit: "%", ref: "37–55", ok: true },
      { name: "Leucocitos", value: "12500", unit: "cel/µL", ref: "6000–17000", ok: true },
      { name: "Plaquetas", value: "280000", unit: "cel/µL", ref: "200000–500000", ok: true },
      { name: "Glucosa", value: "95", unit: "mg/dL", ref: "65–118", ok: true },
      { name: "BUN", value: "22", unit: "mg/dL", ref: "10–30", ok: true },
    ],
  },
  {
    id: 102, petId: 1, date: "2024-01-10", type: "Orina", status: "Completado",
    vet: "Dra. Ruiz",
    params: [
      { name: "pH", value: "6.5", unit: "", ref: "5.5–7.5", ok: true },
      { name: "Densidad", value: "1.025", unit: "", ref: "1.015–1.045", ok: true },
      { name: "Proteína", value: "Trazas", unit: "", ref: "Negativo", ok: false },
      { name: "Glucosa", value: "Negativo", unit: "", ref: "Negativo", ok: true },
    ],
  },
  {
    id: 103, petId: 2, date: "2024-03-20", type: "Piel", status: "Completado",
    vet: "Dr. Pérez",
    params: [
      { name: "Células en capa córnea", value: "Positivo", unit: "", ref: "Negativo", ok: false },
      { name: "Bacteria Gram+", value: "Staphylococcus", unit: "", ref: "Negativo", ok: false },
      { name: "Hongos", value: "Negativo", unit: "", ref: "Negativo", ok: true },
    ],
  },
];

const INIT_APPOINTMENTS = [
  { id: 1, petId: 1, date: "2024-04-05", time: "09:00", reason: "Control post-tratamiento", vet: "Dra. Ruiz", status: "Confirmada" },
  { id: 2, petId: 2, date: "2024-04-08", time: "11:30", reason: "Revisión dermatitis", vet: "Dr. Pérez", status: "Pendiente" },
  { id: 3, petId: 3, date: "2024-04-10", time: "14:00", reason: "Vacunación anual", vet: "Dr. Pérez", status: "Confirmada" },
  { id: 4, petId: 1, date: "2024-04-15", time: "10:00", reason: "Limpieza dental", vet: "Dra. Ruiz", status: "Pendiente" },
];

// ── Reusable Components ────────────────────────────────────────────────────
const Badge = ({ text, color = C.teal, bg }) => (
  <span style={{
    background: bg || color + "20", color, fontSize: 11, fontWeight: 700,
    padding: "2px 10px", borderRadius: 20, letterSpacing: 0.3,
  }}>{text}</span>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.card, borderRadius: 16, boxShadow: shadow,
    padding: 20, border: `1px solid ${C.border}`, ...style,
  }}>{children}</div>
);

const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: C.textSoft, marginBottom: 5 }}>{label}</div>
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: 10,
        border: `1.5px solid ${C.border}`, outline: "none", fontSize: 14,
        color: C.text, background: C.bg, boxSizing: "border-box",
        fontFamily: "inherit",
      }}
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: C.textSoft, marginBottom: 5 }}>{label}</div>
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: 10,
        border: `1.5px solid ${C.border}`, outline: "none", fontSize: 14,
        color: C.text, background: C.bg, boxSizing: "border-box",
        fontFamily: "inherit",
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Btn = ({ children, onClick, color = C.teal, outline, small, style = {} }) => (
  <button onClick={onClick} style={{
    background: outline ? "transparent" : color,
    color: outline ? color : "#fff",
    border: `2px solid ${color}`,
    borderRadius: 10, padding: small ? "6px 16px" : "10px 22px",
    fontSize: small ? 13 : 14, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit", transition: "all .15s", ...style,
  }}>{children}</button>
);

const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.45)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: width,
        maxHeight: "90vh", overflowY: "auto", boxShadow: shadowMd,
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 24px 0",
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{title}</div>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 22, cursor: "pointer",
            color: C.textSoft, lineHeight: 1,
          }}>×</button>
        </div>
        <div style={{ padding: "16px 24px 24px" }}>{children}</div>
      </div>
    </div>
  );
};

// ── DASHBOARD ──────────────────────────────────────────────────────────────
function Dashboard({ pets, appointments, history, labs, setTab }) {
  const today = new Date();
  const upcoming = appointments.filter(a => new Date(a.date) >= today).slice(0, 3);
  const recentHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  const stats = [
    { label: "Mascotas", value: pets.length, icon: "🐾", color: C.teal, bg: C.tealSoft },
    { label: "Citas pendientes", value: appointments.filter(a => a.status === "Pendiente").length, icon: "📅", color: C.orange, bg: C.orangeLight },
    { label: "Exámenes lab", value: labs.length, icon: "🔬", color: C.blue, bg: "#E3F2FD" },
    { label: "Consultas mes", value: history.length, icon: "📋", color: C.purple, bg: "#F3E5F5" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.tealDark} 0%, ${C.teal} 100%)`,
        borderRadius: 20, padding: "28px 28px 32px", color: "#fff", marginBottom: 24,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, fontSize: 120, opacity: .08 }}>🐾</div>
        <div style={{ fontSize: 13, opacity: .8, marginBottom: 4 }}>Bienvenido a</div>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>Celivet</div>
        <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>
          {today.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ padding: 18 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: s.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, marginBottom: 10,
            }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.textSoft, fontWeight: 600 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Próximas citas */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>📅 Próximas Citas</div>
          <Btn small outline onClick={() => setTab("citas")}>Ver todas</Btn>
        </div>
        {upcoming.length === 0 && <div style={{ color: C.textSoft, fontSize: 13 }}>No hay citas próximas.</div>}
        {upcoming.map(a => {
          const pet = pets.find(p => p.id === a.petId);
          return (
            <div key={a.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: pet?.avatarColor || C.tealSoft,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>{pet?.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{pet?.name}</div>
                <div style={{ fontSize: 12, color: C.textSoft }}>{a.reason}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.teal }}>{a.date}</div>
                <div style={{ fontSize: 12, color: C.textSoft }}>{a.time}</div>
              </div>
            </div>
          );
        })}
      </Card>

      {/* Historial reciente */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>📋 Consultas Recientes</div>
          <Btn small outline onClick={() => setTab("historial")}>Ver todo</Btn>
        </div>
        {recentHistory.map(h => {
          const pet = pets.find(p => p.id === h.petId);
          return (
            <div key={h.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: 22 }}>{pet?.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{pet?.name}</div>
                <div style={{ fontSize: 12, color: C.textSoft }}>{h.reason}</div>
              </div>
              <Badge text={h.date} color={C.teal} />
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ── MASCOTAS ───────────────────────────────────────────────────────────────
function Mascotas({ pets, setPets }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({
    name: "", species: "Perro", breed: "", age: "", weight: "", color: "", sex: "Hembra",
    owner: "", ownerPhone: "", ownerEmail: "", ownerAddress: "", chip: "",
    avatar: "🐕", avatarColor: "#FFF3E0",
  });

  const filtered = pets.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.owner) return;
    setPets(prev => [...prev, { ...form, id: Date.now() }]);
    setModal(false);
    setForm({ name: "", species: "Perro", breed: "", age: "", weight: "", color: "", sex: "Hembra", owner: "", ownerPhone: "", ownerEmail: "", ownerAddress: "", chip: "", avatar: "🐕", avatarColor: "#FFF3E0" });
  };

  const speciesOpts = [
    { value: "Perro", label: "🐕 Perro" }, { value: "Gato", label: "🐈 Gato" },
    { value: "Ave", label: "🦜 Ave" }, { value: "Conejo", label: "🐰 Conejo" },
    { value: "Otro", label: "🐾 Otro" },
  ];

  if (detail) {
    const p = detail;
    return (
      <div>
        <button onClick={() => setDetail(null)} style={{
          background: "none", border: "none", color: C.teal, fontWeight: 700,
          fontSize: 15, cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", gap: 6,
        }}>← Volver</button>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20, background: p.avatarColor,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
            }}>{p.avatar}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.text }}>{p.name}</div>
              <div style={{ color: C.textSoft, fontSize: 14 }}>{p.species} · {p.breed}</div>
              <Badge text={p.sex} color={p.sex === "Hembra" ? C.purple : C.blue} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["Edad", p.age], ["Peso", p.weight], ["Color", p.color], ["Chip", p.chip || "—"]].map(([k, v]) => (
              <div key={k} style={{ background: C.bg, borderRadius: 12, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 16 }}>👤 Datos del Propietario</div>
          {[["Nombre", p.owner], ["Teléfono", p.ownerPhone], ["Email", p.ownerEmail], ["Dirección", p.ownerAddress]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
              <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 600, minWidth: 80 }}>{k}</div>
              <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: C.text }}>🐾 Mascotas</div>
        <Btn onClick={() => setModal(true)}>+ Nueva</Btn>
      </div>
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Buscar mascota o propietario..."
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: `1.5px solid ${C.border}`, fontSize: 14, marginBottom: 20,
          boxSizing: "border-box", background: C.card, fontFamily: "inherit",
        }}
      />
      {filtered.map(p => (
        <Card key={p.id} style={{ marginBottom: 12, cursor: "pointer" }} >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }} onClick={() => setDetail(p)}>
            <div style={{
              width: 54, height: 54, borderRadius: 15, background: p.avatarColor,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
            }}>{p.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>{p.name}</div>
              <div style={{ fontSize: 13, color: C.textSoft }}>{p.species} · {p.breed}</div>
              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 2 }}>👤 {p.owner}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Badge text={p.age} color={C.teal} />
              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 4 }}>{p.weight}</div>
            </div>
          </div>
        </Card>
      ))}

      <Modal open={modal} onClose={() => setModal(false)} title="Nueva Mascota">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label="Nombre *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <Select label="Especie" value={form.species} onChange={v => setForm(f => ({ ...f, species: v }))} options={speciesOpts} />
          <Input label="Raza" value={form.breed} onChange={v => setForm(f => ({ ...f, breed: v }))} />
          <Input label="Edad" value={form.age} onChange={v => setForm(f => ({ ...f, age: v }))} />
          <Input label="Peso" value={form.weight} onChange={v => setForm(f => ({ ...f, weight: v }))} />
          <Input label="Color" value={form.color} onChange={v => setForm(f => ({ ...f, color: v }))} />
          <Select label="Sexo" value={form.sex} onChange={v => setForm(f => ({ ...f, sex: v }))} options={[{ value: "Hembra", label: "Hembra" }, { value: "Macho", label: "Macho" }]} />
          <Input label="Microchip" value={form.chip} onChange={v => setForm(f => ({ ...f, chip: v }))} />
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, margin: "12px 0 16px", paddingTop: 16, fontSize: 13, fontWeight: 700, color: C.textSoft }}>DATOS DEL PROPIETARIO</div>
        <Input label="Nombre del propietario *" value={form.owner} onChange={v => setForm(f => ({ ...f, owner: v }))} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label="Teléfono" value={form.ownerPhone} onChange={v => setForm(f => ({ ...f, ownerPhone: v }))} />
          <Input label="Email" value={form.ownerEmail} onChange={v => setForm(f => ({ ...f, ownerEmail: v }))} type="email" />
        </div>
        <Input label="Dirección" value={form.ownerAddress} onChange={v => setForm(f => ({ ...f, ownerAddress: v }))} />
        <Btn onClick={handleAdd} style={{ width: "100%", marginTop: 8 }}>Guardar Mascota</Btn>
      </Modal>
    </div>
  );
}

// ── HISTORIAL CLÍNICO ──────────────────────────────────────────────────────
function Historial({ pets, history, setHistory, labs }) {
  const [selPet, setSelPet] = useState(null);
  const [modal, setModal] = useState(false);
  const [labModal, setLabModal] = useState(null);
  const [form, setForm] = useState({ date: "", vet: "", reason: "", diagnosis: "", treatment: "", weight: "", temp: "", hr: "", notes: "" });

  const petHistory = selPet ? history.filter(h => h.petId === selPet.id) : [];

  const handleAdd = () => {
    if (!form.reason) return;
    const entry = { ...form, id: Date.now(), petId: selPet.id, attachments: [], labs: [] };
    setHistory(prev => [...prev, entry]);
    setModal(false);
    setForm({ date: "", vet: "", reason: "", diagnosis: "", treatment: "", weight: "", temp: "", hr: "", notes: "" });
  };

  if (selPet) {
    return (
      <div>
        <button onClick={() => setSelPet(null)} style={{
          background: "none", border: "none", color: C.teal, fontWeight: 700,
          fontSize: 15, cursor: "pointer", marginBottom: 16,
        }}>← Volver</button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: selPet.avatarColor,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
            }}>{selPet.avatar}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: C.text }}>{selPet.name}</div>
              <div style={{ fontSize: 13, color: C.textSoft }}>{selPet.species} · {selPet.breed}</div>
            </div>
          </div>
          <Btn onClick={() => setModal(true)}>+ Consulta</Btn>
        </div>

        {petHistory.length === 0 && (
          <Card>
            <div style={{ textAlign: "center", color: C.textSoft, padding: 30 }}>
              <div style={{ fontSize: 40 }}>📋</div>
              <div style={{ marginTop: 8 }}>Sin historial clínico aún</div>
            </div>
          </Card>
        )}

        {[...petHistory].sort((a, b) => new Date(b.date) - new Date(a.date)).map(h => {
          const hLabs = labs.filter(l => h.labs?.includes(l.id));
          return (
            <Card key={h.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <Badge text={h.date} color={C.teal} />
                  <span style={{ marginLeft: 8, fontSize: 13, color: C.textSoft }}>{h.vet}</span>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 6 }}>{h.reason}</div>

              <div style={{ background: C.bg, borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: C.textSoft, fontWeight: 600 }}>DIAGNÓSTICO</div>
                <div style={{ fontSize: 14, color: C.text }}>{h.diagnosis}</div>
              </div>
              <div style={{ background: C.bg, borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: C.textSoft, fontWeight: 600 }}>TRATAMIENTO</div>
                <div style={{ fontSize: 14, color: C.text }}>{h.treatment}</div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {[["⚖️", "Peso", h.weight], ["🌡️", "Temp", h.temp], ["💓", "FC", h.hr]].map(([ico, k, v]) => v ? (
                  <div key={k} style={{
                    flex: 1, background: C.tealSoft, borderRadius: 10, padding: "8px 10px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 16 }}>{ico}</div>
                    <div style={{ fontSize: 11, color: C.textSoft }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.teal }}>{v}</div>
                  </div>
                ) : null)}
              </div>

              {h.attachments?.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: C.textSoft, fontWeight: 600, marginBottom: 6 }}>ADJUNTOS</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {h.attachments.map(a => (
                      <div key={a.name} style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: a.type === "pdf" ? "#FFF3E0" : "#E3F2FD",
                        borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600,
                        color: a.type === "pdf" ? C.orange : C.blue,
                      }}>
                        {a.type === "pdf" ? "📄" : "🖼️"} {a.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hLabs.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, color: C.textSoft, fontWeight: 600, marginBottom: 6 }}>LABORATORIO</div>
                  {hLabs.map(l => (
                    <div key={l.id} onClick={() => setLabModal(l)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "#E3F2FD", borderRadius: 10, padding: "8px 14px", cursor: "pointer",
                    }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span>🔬</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.blue }}>
                          {l.type} — {l.date}
                        </span>
                      </div>
                      <Badge text={l.status} color={C.green} />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}

        <Modal open={modal} onClose={() => setModal(false)} title="Nueva Consulta">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Input label="Fecha" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <Input label="Veterinario" value={form.vet} onChange={v => setForm(f => ({ ...f, vet: v }))} />
          </div>
          <Input label="Motivo de consulta *" value={form.reason} onChange={v => setForm(f => ({ ...f, reason: v }))} />
          <Input label="Diagnóstico" value={form.diagnosis} onChange={v => setForm(f => ({ ...f, diagnosis: v }))} />
          <Input label="Tratamiento" value={form.treatment} onChange={v => setForm(f => ({ ...f, treatment: v }))} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 12px" }}>
            <Input label="Peso" value={form.weight} onChange={v => setForm(f => ({ ...f, weight: v }))} />
            <Input label="Temperatura" value={form.temp} onChange={v => setForm(f => ({ ...f, temp: v }))} />
            <Input label="Frec. Cardíaca" value={form.hr} onChange={v => setForm(f => ({ ...f, hr: v }))} />
          </div>
          <Input label="Notas" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} />
          <div style={{
            border: `2px dashed ${C.border}`, borderRadius: 12, padding: "20px",
            textAlign: "center", color: C.textSoft, fontSize: 13, marginBottom: 16, cursor: "pointer",
          }}>
            📎 Adjuntar PDF o Imagen (simulado)
          </div>
          <Btn onClick={handleAdd} style={{ width: "100%" }}>Guardar Consulta</Btn>
        </Modal>

        <Modal open={!!labModal} onClose={() => setLabModal(null)} title={`Resultado Lab — ${labModal?.type}`}>
          {labModal && (
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <Badge text={labModal.date} color={C.teal} />
                <Badge text={labModal.status} color={C.green} />
                <Badge text={labModal.vet} color={C.blue} />
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.tealSoft }}>
                    {["Parámetro", "Resultado", "Unidad", "Ref.", ""].map(h => (
                      <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.teal, fontWeight: 700, borderRadius: 4 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {labModal.params.map((p, i) => (
                    <tr key={i} style={{ background: i % 2 ? C.bg : "#fff" }}>
                      <td style={{ padding: "8px 10px", fontWeight: 600, color: C.text }}>{p.name}</td>
                      <td style={{ padding: "8px 10px", fontWeight: 700, color: p.ok ? C.green : C.red }}>{p.value}</td>
                      <td style={{ padding: "8px 10px", color: C.textSoft }}>{p.unit}</td>
                      <td style={{ padding: "8px 10px", color: C.textSoft }}>{p.ref}</td>
                      <td style={{ padding: "8px 10px" }}>{p.ok ? "✅" : "⚠️"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 20 }}>📋 Historial Clínico</div>
      <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 16 }}>Selecciona una mascota para ver su historial</div>
      {pets.map(p => {
        const cnt = history.filter(h => h.petId === p.id).length;
        const last = history.filter(h => h.petId === p.id).sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        return (
          <Card key={p.id} style={{ marginBottom: 12, cursor: "pointer" }} >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }} onClick={() => setSelPet(p)}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, background: p.avatarColor,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
              }}>{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{p.name}</div>
                <div style={{ fontSize: 12, color: C.textSoft }}>{p.owner}</div>
                {last && <div style={{ fontSize: 12, color: C.textSoft }}>Última visita: {last.date}</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.teal }}>{cnt}</div>
                <div style={{ fontSize: 11, color: C.textSoft }}>consultas</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ── LABORATORIO ────────────────────────────────────────────────────────────
function Laboratorio({ pets, labs, setLabs }) {
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [filterType, setFilterType] = useState("Todos");
  const [form, setForm] = useState({ petId: "", date: "", type: "Sangre", vet: "" });

  const types = ["Todos", "Sangre", "Orina", "Piel"];

  const filtered = labs.filter(l => filterType === "Todos" || l.type === filterType);

  const typeInfo = {
    Sangre: { icon: "🩸", color: C.red, bg: "#FFEBEE" },
    Orina: { icon: "🧪", color: C.yellow, bg: "#FFFDE7" },
    Piel: { icon: "🔬", color: C.purple, bg: "#F3E5F5" },
  };

  const handleAdd = () => {
    if (!form.petId) return;
    const newLab = {
      id: Date.now(), petId: Number(form.petId), date: form.date,
      type: form.type, status: "Pendiente", vet: form.vet, params: [],
    };
    setLabs(prev => [...prev, newLab]);
    setModal(false);
    setForm({ petId: "", date: "", type: "Sangre", vet: "" });
  };

  if (detail) {
    const ti = typeInfo[detail.type] || typeInfo.Sangre;
    const pet = pets.find(p => p.id === detail.petId);
    return (
      <div>
        <button onClick={() => setDetail(null)} style={{
          background: "none", border: "none", color: C.teal, fontWeight: 700,
          fontSize: 15, cursor: "pointer", marginBottom: 16,
        }}>← Volver</button>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, background: ti.bg,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
            }}>{ti.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: C.text }}>Examen de {detail.type}</div>
              <div style={{ fontSize: 13, color: C.textSoft }}>{pet?.name} · {detail.date}</div>
              <Badge text={detail.status} color={detail.status === "Completado" ? C.green : C.orange} />
            </div>
          </div>
          {detail.params.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Parámetro", "Valor", "Unidad", "Referencia", "Estado"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.textSoft, fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail.params.map((p, i) => (
                  <tr key={i} style={{ background: i % 2 ? C.bg : "#fff", borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "9px 10px", fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: "9px 10px", fontWeight: 700, color: p.ok ? C.green : C.red }}>{p.value}</td>
                    <td style={{ padding: "9px 10px", color: C.textSoft }}>{p.unit}</td>
                    <td style={{ padding: "9px 10px", color: C.textSoft }}>{p.ref}</td>
                    <td style={{ padding: "9px 10px" }}>{p.ok ? <Badge text="Normal" color={C.green} /> : <Badge text="Anormal" color={C.red} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center", padding: 30, color: C.textSoft }}>
              <div style={{ fontSize: 36 }}>{ti.icon}</div>
              <div style={{ marginTop: 8 }}>Resultados pendientes de carga</div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: C.text }}>🔬 Laboratorio</div>
        <Btn onClick={() => setModal(true)}>+ Nuevo</Btn>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilterType(t)} style={{
            padding: "8px 18px", borderRadius: 20, border: `2px solid ${filterType === t ? C.teal : C.border}`,
            background: filterType === t ? C.teal : "#fff", color: filterType === t ? "#fff" : C.textSoft,
            fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          }}>{t}</button>
        ))}
      </div>

      {filtered.map(l => {
        const pet = pets.find(p => p.id === l.petId);
        const ti = typeInfo[l.type] || typeInfo.Sangre;
        const abnormal = l.params.filter(p => !p.ok).length;
        return (
          <Card key={l.id} style={{ marginBottom: 12, cursor: "pointer" }} >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }} onClick={() => setDetail(l)}>
              <div style={{
                width: 50, height: 50, borderRadius: 14, background: ti.bg,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
              }}>{ti.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>Examen de {l.type}</div>
                <div style={{ fontSize: 13, color: C.textSoft }}>{pet?.name} · {pet?.owner}</div>
                <div style={{ fontSize: 12, color: C.textSoft }}>{l.vet}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Badge text={l.status} color={l.status === "Completado" ? C.green : C.orange} />
                <div style={{ fontSize: 12, color: C.textSoft, marginTop: 4 }}>{l.date}</div>
                {abnormal > 0 && <div style={{ fontSize: 11, color: C.red, fontWeight: 700 }}>⚠️ {abnormal} anormal</div>}
              </div>
            </div>
          </Card>
        );
      })}

      <Modal open={modal} onClose={() => setModal(false)} title="Nuevo Examen">
        <Select label="Mascota *" value={form.petId} onChange={v => setForm(f => ({ ...f, petId: v }))}
          options={[{ value: "", label: "Seleccionar..." }, ...pets.map(p => ({ value: p.id, label: `${p.avatar} ${p.name} — ${p.owner}` }))]} />
        <Select label="Tipo de examen" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))}
          options={[
            { value: "Sangre", label: "🩸 Hemograma / Sangre" },
            { value: "Orina", label: "🧪 Uroanálisis / Orina" },
            { value: "Piel", label: "🔬 Raspado / Piel" },
          ]} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label="Fecha" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
          <Input label="Veterinario" value={form.vet} onChange={v => setForm(f => ({ ...f, vet: v }))} />
        </div>
        <Btn onClick={handleAdd} style={{ width: "100%" }}>Crear Examen</Btn>
      </Modal>
    </div>
  );
}

// ── CITAS ──────────────────────────────────────────────────────────────────
function Citas({ pets, appointments, setAppointments }) {
  const [modal, setModal] = useState(false);
  const [selDate, setSelDate] = useState(null);
  const [viewMonth, setViewMonth] = useState(new Date(2024, 3, 1));
  const [form, setForm] = useState({ petId: "", date: "", time: "", reason: "", vet: "" });

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getDateStr = d => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const getAppts = d => appointments.filter(a => a.date === getDateStr(d));

  const handleAdd = () => {
    if (!form.petId || !form.date) return;
    setAppointments(prev => [...prev, { ...form, id: Date.now(), petId: Number(form.petId), status: "Pendiente" }]);
    setModal(false);
    setForm({ petId: "", date: "", time: "", reason: "", vet: "" });
  };

  const dayAppts = selDate ? getAppts(selDate) : [];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: C.text }}>📅 Citas</div>
        <Btn onClick={() => setModal(true)}>+ Nueva</Btn>
      </div>

      <Card style={{ marginBottom: 20 }}>
        {/* Month nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button onClick={() => setViewMonth(new Date(year, month - 1, 1))} style={{
            background: C.tealSoft, border: "none", borderRadius: 10, width: 36, height: 36,
            cursor: "pointer", fontSize: 18, color: C.teal,
          }}>‹</button>
          <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>{monthNames[month]} {year}</div>
          <button onClick={() => setViewMonth(new Date(year, month + 1, 1))} style={{
            background: C.tealSoft, border: "none", borderRadius: 10, width: 36, height: 36,
            cursor: "pointer", fontSize: 18, color: C.teal,
          }}>›</button>
        </div>

        {/* Day names */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 8 }}>
          {dayNames.map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: C.textSoft, padding: "4px 0" }}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const appts = getAppts(d);
            const isSelected = selDate === d;
            return (
              <div key={d} onClick={() => setSelDate(isSelected ? null : d)} style={{
                borderRadius: 10, padding: "6px 2px", textAlign: "center", cursor: "pointer",
                background: isSelected ? C.teal : appts.length ? C.tealLight : "transparent",
                border: isSelected ? `2px solid ${C.tealDark}` : "2px solid transparent",
                transition: "all .15s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? "#fff" : C.text }}>{d}</div>
                {appts.length > 0 && (
                  <div style={{
                    width: 6, height: 6, borderRadius: 3, margin: "2px auto 0",
                    background: isSelected ? "#fff" : C.teal,
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {selDate && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>
            Citas del {selDate} de {monthNames[month]}
          </div>
          {dayAppts.length === 0 && (
            <div style={{ color: C.textSoft, fontSize: 13, textAlign: "center", padding: 20 }}>Sin citas para este día</div>
          )}
          {dayAppts.map(a => {
            const pet = pets.find(p => p.id === a.petId);
            return (
              <Card key={a.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, background: pet?.avatarColor || C.tealSoft,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  }}>{pet?.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{pet?.name}</div>
                    <div style={{ fontSize: 13, color: C.textSoft }}>{a.reason}</div>
                    <div style={{ fontSize: 12, color: C.textSoft }}>{a.vet}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.teal }}>{a.time}</div>
                    <Badge text={a.status} color={a.status === "Confirmada" ? C.green : C.orange} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* All upcoming */}
      <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>Todas las citas</div>
      {[...appointments].sort((a, b) => a.date.localeCompare(b.date)).map(a => {
        const pet = pets.find(p => p.id === a.petId);
        return (
          <Card key={a.id} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: pet?.avatarColor || C.tealSoft,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>{pet?.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: C.text }}>{pet?.name}</div>
                <div style={{ fontSize: 13, color: C.textSoft }}>{a.reason}</div>
                <div style={{ fontSize: 12, color: C.textSoft }}>{a.vet}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.teal }}>{a.date}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{a.time}</div>
                <Badge text={a.status} color={a.status === "Confirmada" ? C.green : C.orange} />
              </div>
            </div>
          </Card>
        );
      })}

      <Modal open={modal} onClose={() => setModal(false)} title="Nueva Cita">
        <Select label="Mascota *" value={form.petId} onChange={v => setForm(f => ({ ...f, petId: v }))}
          options={[{ value: "", label: "Seleccionar..." }, ...pets.map(p => ({ value: p.id, label: `${p.avatar} ${p.name} — ${p.owner}` }))]} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label="Fecha *" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
          <Input label="Hora *" type="time" value={form.time} onChange={v => setForm(f => ({ ...f, time: v }))} />
        </div>
        <Input label="Motivo" value={form.reason} onChange={v => setForm(f => ({ ...f, reason: v }))} />
        <Input label="Veterinario" value={form.vet} onChange={v => setForm(f => ({ ...f, vet: v }))} />
        <Btn onClick={handleAdd} style={{ width: "100%" }}>Agendar Cita</Btn>
      </Modal>
    </div>
  );
}

// ── BOTTOM NAV ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "🏠", label: "Inicio" },
  { id: "mascotas", icon: "🐾", label: "Mascotas" },
  { id: "historial", icon: "📋", label: "Historial" },
  { id: "laboratorio", icon: "🔬", label: "Lab" },
  { id: "citas", icon: "📅", label: "Citas" },
];

// ── APP ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [pets, setPets] = useState(INIT_PETS);
  const [history, setHistory] = useState(INIT_HISTORY);
  const [labs, setLabs] = useState(INIT_LABS);
  const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);

  const renderTab = () => {
    switch (tab) {
      case "dashboard": return <Dashboard pets={pets} appointments={appointments} history={history} labs={labs} setTab={setTab} />;
      case "mascotas": return <Mascotas pets={pets} setPets={setPets} />;
      case "historial": return <Historial pets={pets} history={history} setHistory={setHistory} labs={labs} />;
      case "laboratorio": return <Laboratorio pets={pets} labs={labs} setLabs={setLabs} />;
      case "citas": return <Citas pets={pets} appointments={appointments} setAppointments={setAppointments} />;
    }
  };

  return (
    <div style={{
      maxWidth: 430, margin: "0 auto", background: C.bg,
      minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif",
      position: "relative", display: "flex", flexDirection: "column",
    }}>
      {/* Status bar sim */}
      <div style={{
        background: C.tealDark, color: "#fff", padding: "10px 20px 8px",
        display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700,
      }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span>📶</span><span>🔋</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 90px" }}>
        {renderTab()}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "#fff", borderTop: `1px solid ${C.border}`,
        display: "flex", boxShadow: "0 -4px 20px rgba(0,137,123,.1)",
        zIndex: 100,
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            flex: 1, border: "none", background: "none", cursor: "pointer",
            padding: "10px 0 14px", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, fontFamily: "inherit",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: tab === n.id ? C.teal : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, transition: "all .2s",
            }}>{n.icon}</div>
            <div style={{
              fontSize: 10, fontWeight: 700,
              color: tab === n.id ? C.teal : C.textSoft,
            }}>{n.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
