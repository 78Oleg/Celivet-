# CELIVET — App Veterinaria Flutter
## Estructura del proyecto

```
celivet/
├── pubspec.yaml
├── lib/
│   ├── main.dart
│   ├── theme/
│   │   └── app_theme.dart
│   ├── models/
│   │   ├── pet.dart
│   │   ├── clinical_record.dart
│   │   ├── lab_exam.dart
│   │   └── appointment.dart
│   ├── providers/
│   │   └── app_provider.dart
│   └── screens/
│       ├── dashboard_screen.dart
│       ├── pets/
│       │   ├── pets_screen.dart
│       │   ├── pet_detail_screen.dart
│       │   └── add_pet_screen.dart
│       ├── history/
│       │   ├── history_screen.dart
│       │   ├── pet_history_screen.dart
│       │   └── add_record_screen.dart
│       ├── lab/
│       │   ├── lab_screen.dart
│       │   ├── lab_detail_screen.dart
│       │   └── add_lab_screen.dart
│       └── appointments/
│           ├── appointments_screen.dart
│           └── add_appointment_screen.dart
```

---

## pubspec.yaml

```yaml
name: celivet
description: Sistema de gestión veterinaria Celivet

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.1
  table_calendar: ^3.0.9
  file_picker: ^6.1.1
  image_picker: ^1.0.4
  shared_preferences: ^2.2.2
  intl: ^0.18.1
  uuid: ^4.2.1
  path_provider: ^2.1.1

flutter:
  uses-material-design: true
  assets:
    - assets/images/
```

---

## lib/theme/app_theme.dart

```dart
import 'package:flutter/material.dart';

class AppTheme {
  static const Color teal      = Color(0xFF00897B);
  static const Color tealDark  = Color(0xFF00695C);
  static const Color tealLight = Color(0xFFB2DFDB);
  static const Color tealSoft  = Color(0xFFE0F2F1);
  static const Color orange    = Color(0xFFFF7043);
  static const Color bg        = Color(0xFFF4FAF9);
  static const Color textDark  = Color(0xFF1A2E2C);
  static const Color textSoft  = Color(0xFF5A7A77);
  static const Color border    = Color(0xFFD0EBEA);
  static const Color red       = Color(0xFFE53935);
  static const Color green     = Color(0xFF43A047);
  static const Color blue      = Color(0xFF1E88E5);
  static const Color purple    = Color(0xFF8E24AA);

  static ThemeData get theme => ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: teal,
      primary: teal,
      secondary: orange,
      background: bg,
    ),
    scaffoldBackgroundColor: bg,
    useMaterial3: true,
    fontFamily: 'Roboto',
    appBarTheme: const AppBarTheme(
      backgroundColor: tealDark,
      foregroundColor: Colors.white,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      color: Colors.white,
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: teal,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: bg,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: border),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: teal, width: 2),
      ),
    ),
  );
}
```

---

## lib/models/pet.dart

```dart
class Pet {
  final String id;
  String name;
  String species;  // Perro, Gato, Ave, Conejo, Otro
  String breed;
  String age;
  String weight;
  String color;
  String sex;      // Macho, Hembra
  // Propietario
  String ownerName;
  String ownerPhone;
  String ownerEmail;
  String ownerAddress;
  String chip;

  Pet({
    required this.id,
    required this.name,
    required this.species,
    required this.breed,
    required this.age,
    required this.weight,
    required this.color,
    required this.sex,
    required this.ownerName,
    required this.ownerPhone,
    required this.ownerEmail,
    required this.ownerAddress,
    this.chip = '',
  });

  String get avatarEmoji {
    switch (species) {
      case 'Perro': return '🐕';
      case 'Gato':  return '🐈';
      case 'Ave':   return '🦜';
      case 'Conejo': return '🐰';
      default:      return '🐾';
    }
  }

  Map<String, dynamic> toJson() => {
    'id': id, 'name': name, 'species': species, 'breed': breed,
    'age': age, 'weight': weight, 'color': color, 'sex': sex,
    'ownerName': ownerName, 'ownerPhone': ownerPhone,
    'ownerEmail': ownerEmail, 'ownerAddress': ownerAddress,
    'chip': chip,
  };

  factory Pet.fromJson(Map<String, dynamic> j) => Pet(
    id: j['id'], name: j['name'], species: j['species'],
    breed: j['breed'], age: j['age'], weight: j['weight'],
    color: j['color'], sex: j['sex'], ownerName: j['ownerName'],
    ownerPhone: j['ownerPhone'], ownerEmail: j['ownerEmail'],
    ownerAddress: j['ownerAddress'], chip: j['chip'] ?? '',
  );
}
```

---

## lib/models/clinical_record.dart

```dart
class Attachment {
  final String name;
  final String path;  // local file path
  final String type;  // 'pdf' | 'image'

  Attachment({required this.name, required this.path, required this.type});

  Map<String, dynamic> toJson() =>
      {'name': name, 'path': path, 'type': type};

  factory Attachment.fromJson(Map<String, dynamic> j) =>
      Attachment(name: j['name'], path: j['path'], type: j['type']);
}

class ClinicalRecord {
  final String id;
  final String petId;
  DateTime date;
  String vet;
  String reason;
  String diagnosis;
  String treatment;
  String weight;
  String temperature;
  String heartRate;
  String notes;
  List<Attachment> attachments;
  List<String> labIds;   // referencias a LabExam

  ClinicalRecord({
    required this.id,
    required this.petId,
    required this.date,
    required this.vet,
    required this.reason,
    this.diagnosis = '',
    this.treatment = '',
    this.weight = '',
    this.temperature = '',
    this.heartRate = '',
    this.notes = '',
    this.attachments = const [],
    this.labIds = const [],
  });

  Map<String, dynamic> toJson() => {
    'id': id, 'petId': petId,
    'date': date.toIso8601String(), 'vet': vet, 'reason': reason,
    'diagnosis': diagnosis, 'treatment': treatment,
    'weight': weight, 'temperature': temperature,
    'heartRate': heartRate, 'notes': notes,
    'attachments': attachments.map((a) => a.toJson()).toList(),
    'labIds': labIds,
  };

  factory ClinicalRecord.fromJson(Map<String, dynamic> j) => ClinicalRecord(
    id: j['id'], petId: j['petId'],
    date: DateTime.parse(j['date']),
    vet: j['vet'], reason: j['reason'],
    diagnosis: j['diagnosis'] ?? '', treatment: j['treatment'] ?? '',
    weight: j['weight'] ?? '', temperature: j['temperature'] ?? '',
    heartRate: j['heartRate'] ?? '', notes: j['notes'] ?? '',
    attachments: (j['attachments'] as List? ?? [])
        .map((a) => Attachment.fromJson(a)).toList(),
    labIds: List<String>.from(j['labIds'] ?? []),
  );
}
```

---

## lib/models/lab_exam.dart

```dart
class LabParam {
  final String name;
  String value;
  String unit;
  String reference;
  bool isNormal;

  LabParam({
    required this.name,
    required this.value,
    this.unit = '',
    this.reference = '',
    this.isNormal = true,
  });

  Map<String, dynamic> toJson() => {
    'name': name, 'value': value, 'unit': unit,
    'reference': reference, 'isNormal': isNormal,
  };
  factory LabParam.fromJson(Map<String, dynamic> j) => LabParam(
    name: j['name'], value: j['value'], unit: j['unit'] ?? '',
    reference: j['reference'] ?? '', isNormal: j['isNormal'] ?? true,
  );
}

enum LabType { sangre, orina, piel }

enum LabStatus { pendiente, completado }

class LabExam {
  final String id;
  final String petId;
  DateTime date;
  LabType type;
  LabStatus status;
  String vet;
  List<LabParam> params;

  LabExam({
    required this.id,
    required this.petId,
    required this.date,
    required this.type,
    this.status = LabStatus.pendiente,
    required this.vet,
    this.params = const [],
  });

  String get typeLabel {
    switch (type) {
      case LabType.sangre: return 'Sangre';
      case LabType.orina:  return 'Orina';
      case LabType.piel:   return 'Piel';
    }
  }

  String get typeEmoji {
    switch (type) {
      case LabType.sangre: return '🩸';
      case LabType.orina:  return '🧪';
      case LabType.piel:   return '🔬';
    }
  }

  Map<String, dynamic> toJson() => {
    'id': id, 'petId': petId,
    'date': date.toIso8601String(),
    'type': type.name, 'status': status.name,
    'vet': vet,
    'params': params.map((p) => p.toJson()).toList(),
  };

  factory LabExam.fromJson(Map<String, dynamic> j) => LabExam(
    id: j['id'], petId: j['petId'],
    date: DateTime.parse(j['date']),
    type: LabType.values.firstWhere((e) => e.name == j['type']),
    status: LabStatus.values.firstWhere((e) => e.name == j['status']),
    vet: j['vet'],
    params: (j['params'] as List? ?? [])
        .map((p) => LabParam.fromJson(p)).toList(),
  );
}
```

---

## lib/models/appointment.dart

```dart
enum AppointmentStatus { pendiente, confirmada, cancelada, completada }

class Appointment {
  final String id;
  final String petId;
  DateTime dateTime;
  String reason;
  String vet;
  AppointmentStatus status;
  String notes;

  Appointment({
    required this.id,
    required this.petId,
    required this.dateTime,
    required this.reason,
    required this.vet,
    this.status = AppointmentStatus.pendiente,
    this.notes = '',
  });

  String get statusLabel {
    switch (status) {
      case AppointmentStatus.pendiente:   return 'Pendiente';
      case AppointmentStatus.confirmada:  return 'Confirmada';
      case AppointmentStatus.cancelada:   return 'Cancelada';
      case AppointmentStatus.completada:  return 'Completada';
    }
  }

  Map<String, dynamic> toJson() => {
    'id': id, 'petId': petId,
    'dateTime': dateTime.toIso8601String(),
    'reason': reason, 'vet': vet,
    'status': status.name, 'notes': notes,
  };

  factory Appointment.fromJson(Map<String, dynamic> j) => Appointment(
    id: j['id'], petId: j['petId'],
    dateTime: DateTime.parse(j['dateTime']),
    reason: j['reason'], vet: j['vet'],
    status: AppointmentStatus.values
        .firstWhere((e) => e.name == j['status']),
    notes: j['notes'] ?? '',
  );
}
```

---

## lib/providers/app_provider.dart

```dart
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';
import '../models/pet.dart';
import '../models/clinical_record.dart';
import '../models/lab_exam.dart';
import '../models/appointment.dart';

class AppProvider extends ChangeNotifier {
  final _uuid = const Uuid();

  List<Pet> _pets = [];
  List<ClinicalRecord> _records = [];
  List<LabExam> _labs = [];
  List<Appointment> _appointments = [];

  List<Pet> get pets => _pets;
  List<ClinicalRecord> get records => _records;
  List<LabExam> get labs => _labs;
  List<Appointment> get appointments => _appointments;

  // ── Pets ────────────────────────────────────────────────
  void addPet(Pet pet) {
    _pets.add(pet);
    _save(); notifyListeners();
  }

  void updatePet(Pet pet) {
    final idx = _pets.indexWhere((p) => p.id == pet.id);
    if (idx != -1) { _pets[idx] = pet; _save(); notifyListeners(); }
  }

  void deletePet(String id) {
    _pets.removeWhere((p) => p.id == id);
    _records.removeWhere((r) => r.petId == id);
    _labs.removeWhere((l) => l.petId == id);
    _appointments.removeWhere((a) => a.petId == id);
    _save(); notifyListeners();
  }

  List<ClinicalRecord> recordsFor(String petId) =>
      _records.where((r) => r.petId == petId).toList()
        ..sort((a, b) => b.date.compareTo(a.date));

  List<LabExam> labsFor(String petId) =>
      _labs.where((l) => l.petId == petId).toList()
        ..sort((a, b) => b.date.compareTo(a.date));

  List<Appointment> appointmentsFor(String petId) =>
      _appointments.where((a) => a.petId == petId).toList()
        ..sort((a, b) => a.dateTime.compareTo(b.dateTime));

  List<Appointment> appointmentsOnDay(DateTime day) =>
      _appointments.where((a) =>
        a.dateTime.year == day.year &&
        a.dateTime.month == day.month &&
        a.dateTime.day == day.day
      ).toList()..sort((a, b) => a.dateTime.compareTo(b.dateTime));

  // ── Clinical Records ────────────────────────────────────
  void addRecord(ClinicalRecord record) {
    _records.add(record);
    _save(); notifyListeners();
  }

  void addAttachment(String recordId, Attachment att) {
    final r = _records.firstWhere((r) => r.id == recordId);
    r.attachments = [...r.attachments, att];
    _save(); notifyListeners();
  }

  // ── Lab Exams ───────────────────────────────────────────
  void addLab(LabExam lab) {
    _labs.add(lab);
    _save(); notifyListeners();
  }

  void updateLab(LabExam lab) {
    final idx = _labs.indexWhere((l) => l.id == lab.id);
    if (idx != -1) { _labs[idx] = lab; _save(); notifyListeners(); }
  }

  // ── Appointments ────────────────────────────────────────
  void addAppointment(Appointment appt) {
    _appointments.add(appt);
    _save(); notifyListeners();
  }

  void updateAppointmentStatus(String id, AppointmentStatus status) {
    final appt = _appointments.firstWhere((a) => a.id == id);
    appt.status = status;
    _save(); notifyListeners();
  }

  void deleteAppointment(String id) {
    _appointments.removeWhere((a) => a.id == id);
    _save(); notifyListeners();
  }

  // ── Persistence ─────────────────────────────────────────
  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final petsJson    = prefs.getString('pets');
    final recordsJson = prefs.getString('records');
    final labsJson    = prefs.getString('labs');
    final apptsJson   = prefs.getString('appointments');

    if (petsJson    != null) _pets        = (jsonDecode(petsJson)    as List).map((e) => Pet.fromJson(e)).toList();
    if (recordsJson != null) _records     = (jsonDecode(recordsJson) as List).map((e) => ClinicalRecord.fromJson(e)).toList();
    if (labsJson    != null) _labs        = (jsonDecode(labsJson)    as List).map((e) => LabExam.fromJson(e)).toList();
    if (apptsJson   != null) _appointments = (jsonDecode(apptsJson)  as List).map((e) => Appointment.fromJson(e)).toList();
    notifyListeners();
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('pets',         jsonEncode(_pets.map((p) => p.toJson()).toList()));
    await prefs.setString('records',      jsonEncode(_records.map((r) => r.toJson()).toList()));
    await prefs.setString('labs',         jsonEncode(_labs.map((l) => l.toJson()).toList()));
    await prefs.setString('appointments', jsonEncode(_appointments.map((a) => a.toJson()).toList()));
  }

  String newId() => _uuid.v4();
}
```

---

## lib/main.dart

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'providers/app_provider.dart';
import 'screens/dashboard_screen.dart';
import 'screens/pets/pets_screen.dart';
import 'screens/history/history_screen.dart';
import 'screens/lab/lab_screen.dart';
import 'screens/appointments/appointments_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final provider = AppProvider();
  await provider.load();
  runApp(
    ChangeNotifierProvider.value(value: provider, child: const CelivetApp()),
  );
}

class CelivetApp extends StatelessWidget {
  const CelivetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Celivet',
      theme: AppTheme.theme,
      debugShowCheckedModeBanner: false,
      home: const MainShell(),
    );
  }
}

class MainShell extends StatefulWidget {
  const MainShell({super.key});
  @override State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _idx = 0;

  final _screens = const [
    DashboardScreen(),
    PetsScreen(),
    HistoryScreen(),
    LabScreen(),
    AppointmentsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _idx, children: _screens),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _idx,
        onDestinationSelected: (i) => setState(() => _idx = i),
        backgroundColor: Colors.white,
        indicatorColor: AppTheme.tealSoft,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Inicio'),
          NavigationDestination(icon: Icon(Icons.pets_outlined), selectedIcon: Icon(Icons.pets), label: 'Mascotas'),
          NavigationDestination(icon: Icon(Icons.history_outlined), selectedIcon: Icon(Icons.history), label: 'Historial'),
          NavigationDestination(icon: Icon(Icons.science_outlined), selectedIcon: Icon(Icons.science), label: 'Lab'),
          NavigationDestination(icon: Icon(Icons.calendar_month_outlined), selectedIcon: Icon(Icons.calendar_month), label: 'Citas'),
        ],
      ),
    );
  }
}
```

---

## lib/screens/dashboard_screen.dart

```dart
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../providers/app_provider.dart';
import '../../theme/app_theme.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final p = context.watch<AppProvider>();
    final now = DateTime.now();
    final upcoming = p.appointments
        .where((a) => a.dateTime.isAfter(now))
        .toList()..sort((a, b) => a.dateTime.compareTo(b.dateTime));

    return Scaffold(
      body: CustomScrollView(slivers: [
        SliverAppBar(
          expandedHeight: 160,
          pinned: true,
          flexibleSpace: FlexibleSpaceBar(
            background: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.tealDark, AppTheme.teal],
                  begin: Alignment.topLeft, end: Alignment.bottomRight,
                ),
              ),
              child: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Bienvenido a', style: TextStyle(color: Colors.white70, fontSize: 14)),
                      const Text('Celivet 🐾', style: TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.w900)),
                      Text(DateFormat("EEEE d 'de' MMMM, yyyy", 'es').format(now),
                          style: const TextStyle(color: Colors.white70, fontSize: 13)),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),

        SliverPadding(
          padding: const EdgeInsets.all(16),
          sliver: SliverList(delegate: SliverChildListDelegate([
            // Stat cards
            GridView.count(
              crossAxisCount: 2, shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 12, mainAxisSpacing: 12, childAspectRatio: 1.4,
              children: [
                _StatCard('🐾', 'Mascotas', p.pets.length, AppTheme.teal, AppTheme.tealSoft),
                _StatCard('📅', 'Citas pendientes',
                    p.appointments.where((a) => a.status.name == 'pendiente').length,
                    AppTheme.orange, const Color(0xFFFFE0D7)),
                _StatCard('🔬', 'Exámenes lab', p.labs.length, AppTheme.blue, const Color(0xFFE3F2FD)),
                _StatCard('📋', 'Consultas', p.records.length, AppTheme.purple, const Color(0xFFF3E5F5)),
              ],
            ),

            const SizedBox(height: 20),

            // Próximas citas
            const Text('📅 Próximas Citas', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
            const SizedBox(height: 10),
            if (upcoming.isEmpty)
              const Card(child: Padding(
                padding: EdgeInsets.all(20),
                child: Center(child: Text('Sin citas próximas')),
              ))
            else
              ...upcoming.take(3).map((a) {
                final pet = p.pets.where((x) => x.id == a.petId).firstOrNull;
                return Card(
                  margin: const EdgeInsets.only(bottom: 10),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: AppTheme.tealSoft,
                      child: Text(pet?.avatarEmoji ?? '🐾', style: const TextStyle(fontSize: 22)),
                    ),
                    title: Text(pet?.name ?? 'Mascota', style: const TextStyle(fontWeight: FontWeight.w700)),
                    subtitle: Text(a.reason),
                    trailing: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(DateFormat('dd/MM').format(a.dateTime),
                            style: const TextStyle(color: AppTheme.teal, fontWeight: FontWeight.bold)),
                        Text(DateFormat('HH:mm').format(a.dateTime),
                            style: const TextStyle(fontSize: 12)),
                      ],
                    ),
                  ),
                );
              }),

            const SizedBox(height: 12),
            const Text('📋 Últimas Consultas', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
            const SizedBox(height: 10),
            ...p.records.take(3).map((r) {
              final pet = p.pets.where((x) => x.id == r.petId).firstOrNull;
              return Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  leading: Text(pet?.avatarEmoji ?? '🐾', style: const TextStyle(fontSize: 28)),
                  title: Text(pet?.name ?? '—', style: const TextStyle(fontWeight: FontWeight.w700)),
                  subtitle: Text(r.reason),
                  trailing: Chip(
                    label: Text(DateFormat('dd/MM/yy').format(r.date)),
                    backgroundColor: AppTheme.tealSoft,
                    labelStyle: const TextStyle(color: AppTheme.teal, fontWeight: FontWeight.w700),
                  ),
                ),
              );
            }),
            const SizedBox(height: 20),
          ])),
        ),
      ]),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String emoji, label;
  final int value;
  final Color color, bg;
  const _StatCard(this.emoji, this.label, this.value, this.color, this.bg);

  @override
  Widget build(BuildContext context) => Card(
    child: Padding(
      padding: const EdgeInsets.all(14),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          width: 40, height: 40, decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(12)),
          child: Center(child: Text(emoji, style: const TextStyle(fontSize: 20))),
        ),
        const SizedBox(height: 8),
        Text('$value', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: color)),
        Text(label, style: const TextStyle(fontSize: 11, color: AppTheme.textSoft, fontWeight: FontWeight.w600)),
      ]),
    ),
  );
}
```

---

## lib/screens/appointments/appointments_screen.dart

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:intl/intl.dart';
import '../../providers/app_provider.dart';
import '../../theme/app_theme.dart';
import '../../models/appointment.dart';
import 'add_appointment_screen.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  DateTime _focused = DateTime.now();
  DateTime? _selected;

  @override
  Widget build(BuildContext context) {
    final p = context.watch<AppProvider>();
    final dayAppts = _selected != null ? p.appointmentsOnDay(_selected!) : [];

    return Scaffold(
      appBar: AppBar(title: const Text('📅 Citas'), centerTitle: true),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => Navigator.push(context,
            MaterialPageRoute(builder: (_) => const AddAppointmentScreen())),
        backgroundColor: AppTheme.teal,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Nueva cita', style: TextStyle(color: Colors.white)),
      ),
      body: Column(children: [
        // Calendar
        TableCalendar(
          firstDay: DateTime(2020),
          lastDay: DateTime(2030),
          focusedDay: _focused,
          selectedDayPredicate: (d) => isSameDay(d, _selected),
          onDaySelected: (sel, foc) => setState(() { _selected = sel; _focused = foc; }),
          calendarStyle: CalendarStyle(
            selectedDecoration: const BoxDecoration(color: AppTheme.teal, shape: BoxShape.circle),
            todayDecoration: BoxDecoration(color: AppTheme.teal.withOpacity(.3), shape: BoxShape.circle),
            markerDecoration: const BoxDecoration(color: AppTheme.orange, shape: BoxShape.circle),
          ),
          headerStyle: const HeaderStyle(formatButtonVisible: false, titleCentered: true),
          eventLoader: (day) => p.appointmentsOnDay(day),
        ),

        // Appointments for selected day
        if (_selected != null) ...[
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 6),
            child: Text(
              'Citas del ${DateFormat("d 'de' MMMM", 'es').format(_selected!)}',
              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15),
            ),
          ),
          if (dayAppts.isEmpty)
            const Padding(
              padding: EdgeInsets.all(20),
              child: Text('Sin citas para este día', style: TextStyle(color: AppTheme.textSoft)),
            )
          else
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: dayAppts.length,
                itemBuilder: (_, i) => _ApptTile(dayAppts[i] as Appointment, p),
              ),
            ),
        ] else
          const Expanded(
            child: Center(
              child: Text('Selecciona un día para ver las citas',
                  style: TextStyle(color: AppTheme.textSoft)),
            ),
          ),
      ]),
    );
  }
}

class _ApptTile extends StatelessWidget {
  final Appointment a;
  final AppProvider p;
  const _ApptTile(this.a, this.p);

  @override
  Widget build(BuildContext context) {
    final pet = p.pets.where((x) => x.id == a.petId).firstOrNull;
    final statusColor = a.status == AppointmentStatus.confirmada ? AppTheme.green
        : a.status == AppointmentStatus.cancelada ? AppTheme.red : AppTheme.orange;

    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: AppTheme.tealSoft,
          child: Text(pet?.avatarEmoji ?? '🐾', style: const TextStyle(fontSize: 22)),
        ),
        title: Text(pet?.name ?? '—', style: const TextStyle(fontWeight: FontWeight.w700)),
        subtitle: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(a.reason),
          Text(a.vet, style: const TextStyle(fontSize: 12, color: AppTheme.textSoft)),
        ]),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(DateFormat('HH:mm').format(a.dateTime),
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: AppTheme.teal)),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: statusColor.withOpacity(.15),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(a.statusLabel,
                  style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.w700)),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

## lib/screens/lab/lab_screen.dart

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../providers/app_provider.dart';
import '../../theme/app_theme.dart';
import '../../models/lab_exam.dart';
import 'lab_detail_screen.dart';
import 'add_lab_screen.dart';

class LabScreen extends StatefulWidget {
  const LabScreen({super.key});
  @override State<LabScreen> createState() => _LabScreenState();
}

class _LabScreenState extends State<LabScreen> {
  LabType? _filter;

  @override
  Widget build(BuildContext context) {
    final p = context.watch<AppProvider>();
    final labs = _filter == null
        ? p.labs
        : p.labs.where((l) => l.type == _filter).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('🔬 Laboratorio'), centerTitle: true),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => Navigator.push(context,
            MaterialPageRoute(builder: (_) => const AddLabScreen())),
        backgroundColor: AppTheme.teal,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Nuevo examen', style: TextStyle(color: Colors.white)),
      ),
      body: Column(children: [
        // Filter chips
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(children: [
              FilterChip(label: const Text('Todos'), selected: _filter == null,
                  onSelected: (_) => setState(() => _filter = null),
                  selectedColor: AppTheme.tealLight),
              const SizedBox(width: 8),
              ...LabType.values.map((t) {
                final e = LabExam(id: '', petId: '', date: DateTime.now(), type: t, vet: '');
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text('${e.typeEmoji} ${e.typeLabel}'),
                    selected: _filter == t,
                    onSelected: (_) => setState(() => _filter = t),
                    selectedColor: AppTheme.tealLight,
                  ),
                );
              }),
            ]),
          ),
        ),

        Expanded(
          child: labs.isEmpty
              ? const Center(child: Text('Sin exámenes registrados'))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: labs.length,
                  itemBuilder: (_, i) {
                    final l = labs[i];
                    final pet = p.pets.where((x) => x.id == l.petId).firstOrNull;
                    final abnormal = l.params.where((x) => !x.isNormal).length;
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ListTile(
                        leading: Container(
                          width: 48, height: 48,
                          decoration: BoxDecoration(
                            color: _labColor(l.type).withOpacity(.15),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(child: Text(l.typeEmoji, style: const TextStyle(fontSize: 26))),
                        ),
                        title: Text('Examen de ${l.typeLabel}',
                            style: const TextStyle(fontWeight: FontWeight.w700)),
                        subtitle: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text('${pet?.name ?? '—'} · ${DateFormat('dd/MM/yyyy').format(l.date)}'),
                          if (abnormal > 0)
                            Text('⚠️ $abnormal parámetro${abnormal > 1 ? 's' : ''} anormal',
                                style: const TextStyle(color: AppTheme.red, fontWeight: FontWeight.w600, fontSize: 12)),
                        ]),
                        trailing: Chip(
                          label: Text(l.status == LabStatus.completado ? 'Completado' : 'Pendiente'),
                          backgroundColor: l.status == LabStatus.completado
                              ? AppTheme.green.withOpacity(.15) : AppTheme.orange.withOpacity(.15),
                          labelStyle: TextStyle(
                            color: l.status == LabStatus.completado ? AppTheme.green : AppTheme.orange,
                            fontWeight: FontWeight.w700, fontSize: 11,
                          ),
                        ),
                        onTap: () => Navigator.push(context,
                            MaterialPageRoute(builder: (_) => LabDetailScreen(lab: l))),
                      ),
                    );
                  },
                ),
        ),
      ]),
    );
  }

  Color _labColor(LabType t) {
    switch (t) {
      case LabType.sangre: return AppTheme.red;
      case LabType.orina:  return AppTheme.yellow;
      case LabType.piel:   return AppTheme.purple;
    }
  }
}
```

---

> **NOTA:** Las pantallas `AddPetScreen`, `PetDetailScreen`, `HistoryScreen`,
> `PetHistoryScreen`, `AddRecordScreen`, `LabDetailScreen`, `AddLabScreen` y
> `AddAppointmentScreen` siguen el mismo patrón de `Consumer<AppProvider>` +
> formularios con `TextFormField` y validación con `GlobalKey<FormState>`.
>
> Para adjuntar archivos en `AddRecordScreen` usar el paquete `file_picker`:
> ```dart
> final result = await FilePicker.platform.pickFiles(
>   type: FileType.custom,
>   allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png'],
> );
> if (result != null) {
>   final att = Attachment(
>     name: result.files.single.name,
>     path: result.files.single.path!,
>     type: result.files.single.extension == 'pdf' ? 'pdf' : 'image',
>   );
>   provider.addAttachment(recordId, att);
> }
> ```

---

## Comandos para ejecutar

```bash
# Crear proyecto
flutter create celivet
cd celivet

# Reemplazar lib/ con el código de arriba
# Actualizar pubspec.yaml

# Instalar dependencias
flutter pub get

# Ejecutar (dispositivo Android 4.4.2 mínimo SDK 19)
flutter run

# Generar APK
flutter build apk --release
```
