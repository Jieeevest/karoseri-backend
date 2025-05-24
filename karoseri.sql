--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ActivityLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActivityLog" (
    id integer NOT NULL,
    activity text NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "employeeId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ActivityLog" OWNER TO postgres;

--
-- Name: ActivityLog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ActivityLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ActivityLog_id_seq" OWNER TO postgres;

--
-- Name: ActivityLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ActivityLog_id_seq" OWNED BY public."ActivityLog".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Employee" (
    id integer NOT NULL,
    nik text,
    "fullName" text,
    email text NOT NULL,
    "phoneNumber" text,
    password text,
    "employeeNumber" text,
    "profileImage" text DEFAULT ''::text,
    "joinedDate" timestamp(3) without time zone,
    "resignedDate" timestamp(3) without time zone,
    "homeAddress" text,
    "birthPlace" text,
    "birthDate" timestamp(3) without time zone,
    gender text,
    nationality text,
    religion text,
    "maritalStatus" text DEFAULT ''::text,
    "positionId" integer NOT NULL,
    "roleId" integer NOT NULL,
    "groupId" integer NOT NULL,
    status text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Employee" OWNER TO postgres;

--
-- Name: Employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Employee_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Employee_id_seq" OWNER TO postgres;

--
-- Name: Employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Employee_id_seq" OWNED BY public."Employee".id;


--
-- Name: ErrorLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ErrorLog" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ErrorLog" OWNER TO postgres;

--
-- Name: ErrorLog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ErrorLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ErrorLog_id_seq" OWNER TO postgres;

--
-- Name: ErrorLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ErrorLog_id_seq" OWNED BY public."ErrorLog".id;


--
-- Name: Group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Group" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    status text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Group" OWNER TO postgres;

--
-- Name: Group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Group_id_seq" OWNER TO postgres;

--
-- Name: Group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Group_id_seq" OWNED BY public."Group".id;


--
-- Name: Inbound; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Inbound" (
    id integer NOT NULL,
    "incomingDate" timestamp(3) without time zone NOT NULL,
    "deliveryNumber" text,
    "supplierId" integer NOT NULL,
    receiver integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Inbound" OWNER TO postgres;

--
-- Name: InboundItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InboundItems" (
    id integer NOT NULL,
    "inboundId" integer NOT NULL,
    "inventoryId" integer NOT NULL,
    amount integer NOT NULL,
    "typeId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."InboundItems" OWNER TO postgres;

--
-- Name: InboundItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."InboundItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."InboundItems_id_seq" OWNER TO postgres;

--
-- Name: InboundItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."InboundItems_id_seq" OWNED BY public."InboundItems".id;


--
-- Name: Inbound_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Inbound_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Inbound_id_seq" OWNER TO postgres;

--
-- Name: Inbound_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Inbound_id_seq" OWNED BY public."Inbound".id;


--
-- Name: Inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Inventory" (
    id integer NOT NULL,
    name text,
    amount integer DEFAULT 0 NOT NULL,
    "typeId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "minimumStock" integer DEFAULT 0 NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Inventory" OWNER TO postgres;

--
-- Name: Inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Inventory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Inventory_id_seq" OWNER TO postgres;

--
-- Name: Inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Inventory_id_seq" OWNED BY public."Inventory".id;


--
-- Name: Outbound; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Outbound" (
    id integer NOT NULL,
    "outcomingDate" timestamp(3) without time zone NOT NULL,
    "deliveryNumber" text,
    "supplierId" integer NOT NULL,
    submitter integer NOT NULL,
    approver integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Outbound" OWNER TO postgres;

--
-- Name: OutboundItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OutboundItems" (
    id integer NOT NULL,
    "outboundId" integer NOT NULL,
    "inventoryId" integer NOT NULL,
    amount integer NOT NULL,
    "typeId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OutboundItems" OWNER TO postgres;

--
-- Name: OutboundItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OutboundItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OutboundItems_id_seq" OWNER TO postgres;

--
-- Name: OutboundItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OutboundItems_id_seq" OWNED BY public."OutboundItems".id;


--
-- Name: Outbound_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Outbound_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Outbound_id_seq" OWNER TO postgres;

--
-- Name: Outbound_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Outbound_id_seq" OWNED BY public."Outbound".id;


--
-- Name: Position; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Position" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    status text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Position" OWNER TO postgres;

--
-- Name: Position_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Position_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Position_id_seq" OWNER TO postgres;

--
-- Name: Position_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Position_id_seq" OWNED BY public."Position".id;


--
-- Name: Request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Request" (
    id integer NOT NULL,
    "incomingDate" timestamp(3) without time zone NOT NULL,
    "supplierId" integer NOT NULL,
    submitter integer NOT NULL,
    approver integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Request" OWNER TO postgres;

--
-- Name: RequestItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RequestItems" (
    id integer NOT NULL,
    "requestId" integer NOT NULL,
    "inventoryId" integer NOT NULL,
    amount integer NOT NULL,
    "typeId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."RequestItems" OWNER TO postgres;

--
-- Name: RequestItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RequestItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RequestItems_id_seq" OWNER TO postgres;

--
-- Name: RequestItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RequestItems_id_seq" OWNED BY public."RequestItems".id;


--
-- Name: Request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Request_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Request_id_seq" OWNER TO postgres;

--
-- Name: Request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Request_id_seq" OWNED BY public."Request".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    status text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: SavingLocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SavingLocation" (
    id integer NOT NULL,
    name text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SavingLocation" OWNER TO postgres;

--
-- Name: SavingLocation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SavingLocation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SavingLocation_id_seq" OWNER TO postgres;

--
-- Name: SavingLocation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SavingLocation_id_seq" OWNED BY public."SavingLocation".id;


--
-- Name: Supplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Supplier" (
    id integer NOT NULL,
    name text,
    "phoneNumber" text,
    "phoneNumberAlt" text,
    email text,
    "homeAddress" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    bank text,
    "bankNumber" text,
    "bankOwner" text,
    category text,
    "totalDebt" integer DEFAULT 0,
    status text
);


ALTER TABLE public."Supplier" OWNER TO postgres;

--
-- Name: Supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Supplier_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Supplier_id_seq" OWNER TO postgres;

--
-- Name: Supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Supplier_id_seq" OWNED BY public."Supplier".id;


--
-- Name: Type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Type" (
    id integer NOT NULL,
    name text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Type" OWNER TO postgres;

--
-- Name: Type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Type_id_seq" OWNER TO postgres;

--
-- Name: Type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Type_id_seq" OWNED BY public."Type".id;


--
-- Name: Vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vehicle" (
    id integer NOT NULL,
    "showroomName" text,
    "ownerName" text,
    "expeditionName" text,
    merk text,
    series text,
    color text,
    type text,
    "chasisNumber" text,
    "machineNumber" text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Vehicle" OWNER TO postgres;

--
-- Name: Vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Vehicle_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vehicle_id_seq" OWNER TO postgres;

--
-- Name: Vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Vehicle_id_seq" OWNED BY public."Vehicle".id;


--
-- Name: ActivityLog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityLog" ALTER COLUMN id SET DEFAULT nextval('public."ActivityLog_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Employee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee" ALTER COLUMN id SET DEFAULT nextval('public."Employee_id_seq"'::regclass);


--
-- Name: ErrorLog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ErrorLog" ALTER COLUMN id SET DEFAULT nextval('public."ErrorLog_id_seq"'::regclass);


--
-- Name: Group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Group" ALTER COLUMN id SET DEFAULT nextval('public."Group_id_seq"'::regclass);


--
-- Name: Inbound id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inbound" ALTER COLUMN id SET DEFAULT nextval('public."Inbound_id_seq"'::regclass);


--
-- Name: InboundItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InboundItems" ALTER COLUMN id SET DEFAULT nextval('public."InboundItems_id_seq"'::regclass);


--
-- Name: Inventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory" ALTER COLUMN id SET DEFAULT nextval('public."Inventory_id_seq"'::regclass);


--
-- Name: Outbound id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Outbound" ALTER COLUMN id SET DEFAULT nextval('public."Outbound_id_seq"'::regclass);


--
-- Name: OutboundItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OutboundItems" ALTER COLUMN id SET DEFAULT nextval('public."OutboundItems_id_seq"'::regclass);


--
-- Name: Position id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Position" ALTER COLUMN id SET DEFAULT nextval('public."Position_id_seq"'::regclass);


--
-- Name: Request id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request" ALTER COLUMN id SET DEFAULT nextval('public."Request_id_seq"'::regclass);


--
-- Name: RequestItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestItems" ALTER COLUMN id SET DEFAULT nextval('public."RequestItems_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: SavingLocation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavingLocation" ALTER COLUMN id SET DEFAULT nextval('public."SavingLocation_id_seq"'::regclass);


--
-- Name: Supplier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Supplier" ALTER COLUMN id SET DEFAULT nextval('public."Supplier_id_seq"'::regclass);


--
-- Name: Type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Type" ALTER COLUMN id SET DEFAULT nextval('public."Type_id_seq"'::regclass);


--
-- Name: Vehicle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicle" ALTER COLUMN id SET DEFAULT nextval('public."Vehicle_id_seq"'::regclass);


--
-- Data for Name: ActivityLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ActivityLog" (id, activity, "timestamp", "employeeId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Employee" (id, nik, "fullName", email, "phoneNumber", password, "employeeNumber", "profileImage", "joinedDate", "resignedDate", "homeAddress", "birthPlace", "birthDate", gender, nationality, religion, "maritalStatus", "positionId", "roleId", "groupId", status, "createdAt", "updatedAt") FROM stdin;
2	1234567890	Super Admin User	superadmin@example.com	+621234567890	1234	EMP001	\N	2024-01-01 00:00:00	\N	Jl. Example No.1, Bandung	Bandung	1990-01-01 00:00:00	Male	Indonesian	Islam	Married	1	1	1	active	2025-03-30 22:11:11.933	2025-03-30 22:11:11.933
3	0987654321	Admin User	admin@example.com	+629876543210	1234	EMP002	\N	2024-01-10 00:00:00	\N	Jl. Example No.2, Bandung	Jakarta	1995-05-05 00:00:00	Female	Indonesian	Christian	Single	2	2	1	active	2025-03-30 22:11:24.913	2025-03-30 22:11:24.913
\.


--
-- Data for Name: ErrorLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ErrorLog" (id, name, description, "timestamp", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Group" (id, name, description, status, "createdAt", "updatedAt") FROM stdin;
1	Kelompok Agan	Deskripsi Kelompok Agan	active	2025-03-30 22:10:48.571	2025-05-12 14:41:04.757
2	Kelompok Aco	Deskripsi Kelompok Aco	active	2025-03-30 22:10:53.396	2025-05-12 14:41:25.107
3	Kelompok Endin	Deskripsi Kelompok Endin	active	2025-05-12 13:38:07.27	2025-05-12 14:41:43.84
4	Kelompok Edi	Deskripsi Kelompok Edi	active	2025-05-12 14:42:21.417	2025-05-12 14:42:21.417
5	Kelompok Haris	Deskripsi Kelompok Haris	active	2025-05-12 14:42:35.989	2025-05-12 14:42:35.989
6	Kelompok Naryo	Deskripsi Kelompok Naryo	active	2025-05-12 14:42:49.506	2025-05-12 14:42:49.506
\.


--
-- Data for Name: Inbound; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Inbound" (id, "incomingDate", "deliveryNumber", "supplierId", receiver, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: InboundItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."InboundItems" (id, "inboundId", "inventoryId", amount, "typeId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Inventory" (id, name, amount, "typeId", "categoryId", "locationId", "minimumStock", description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Outbound; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Outbound" (id, "outcomingDate", "deliveryNumber", "supplierId", submitter, approver, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: OutboundItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OutboundItems" (id, "outboundId", "inventoryId", amount, "typeId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Position; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Position" (id, name, description, status, "createdAt", "updatedAt") FROM stdin;
1	Super Admin	Responsible for overall system administration and user management.	active	2025-03-30 22:09:14.133	2025-03-30 22:09:14.133
2	Admin	Manages user data and system configurations.	active	2025-03-30 22:09:28.144	2025-03-30 22:09:28.144
3	Ketua Grup Harian	Deskripsi Jabatan Ketua Grup Harian	active	2025-05-12 14:28:52.917	2025-05-12 14:28:52.917
4	Ketua Grup Cat	Deskripsi Jabatan Ketua Grup Cat	active	2025-05-12 14:31:34.498	2025-05-12 14:36:29.32
5	Ketua Grup Rakit	Deskripsi Jabatan Ketua Grup Rakit	active	2025-05-12 14:39:32.618	2025-05-12 14:39:32.618
6	Human Resource Development	Deskripsi Jabatan Human Resource Development	active	2025-05-12 14:39:56.915	2025-05-12 14:39:56.915
7	Kepala Gudang	Deskripsi Jabatan Kepala Gudang	active	2025-05-12 14:40:25.955	2025-05-12 14:40:25.955
\.


--
-- Data for Name: Request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Request" (id, "incomingDate", "supplierId", submitter, approver, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: RequestItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RequestItems" (id, "requestId", "inventoryId", amount, "typeId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name, description, status, "createdAt", "updatedAt") FROM stdin;
1	Super Admin	Memiliki kontrol penuh atas semua aspek sistem	active	2025-02-04 23:49:58.108	2025-02-04 23:49:58.108
3	Gudang	Mengelola inventaris dan tingkat stok gudang	active	2025-02-04 23:49:58.108	2025-02-04 23:49:58.108
4	Pegawai	Menangani tugas dan operasi sehari-hari	active	2025-02-04 23:49:58.108	2025-02-04 23:49:58.108
5	Developer	Deskripsi Role Akses Developer	active	2025-05-12 14:53:22.501	2025-05-12 14:53:22.501
2	Admin	Mengelola pengaturan sistem dan akses pengguna	active	2025-02-04 23:49:58.108	2025-05-12 15:05:02.881
\.


--
-- Data for Name: SavingLocation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SavingLocation" (id, name, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Supplier" (id, name, "phoneNumber", "phoneNumberAlt", email, "homeAddress", "createdAt", "updatedAt", bank, "bankNumber", "bankOwner", category, "totalDebt", status) FROM stdin;
2	Ardin Steel	082121009977		email@email.com	-	2025-05-12 15:33:47.315	2025-05-12 17:40:54.13	bca	4796899999	Haris Hindarto	non-ppn	0	active
\.


--
-- Data for Name: Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Type" (id, name, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vehicle" (id, "showroomName", "ownerName", "expeditionName", merk, series, color, type, "chasisNumber", "machineNumber", description, "createdAt", "updatedAt") FROM stdin;
1	Showroom 1	aji	Ekspedisi 1	toyota	1000	merah	J	1000x	1000xxx	deskripsi	2025-05-24 07:14:40.424	2025-05-24 07:14:40.424
\.


--
-- Name: ActivityLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ActivityLog_id_seq"', 1, false);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);


--
-- Name: Employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Employee_id_seq"', 3, true);


--
-- Name: ErrorLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ErrorLog_id_seq"', 1, false);


--
-- Name: Group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Group_id_seq"', 6, true);


--
-- Name: InboundItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."InboundItems_id_seq"', 1, false);


--
-- Name: Inbound_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Inbound_id_seq"', 1, false);


--
-- Name: Inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Inventory_id_seq"', 1, false);


--
-- Name: OutboundItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OutboundItems_id_seq"', 1, false);


--
-- Name: Outbound_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Outbound_id_seq"', 1, false);


--
-- Name: Position_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Position_id_seq"', 7, true);


--
-- Name: RequestItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RequestItems_id_seq"', 1, false);


--
-- Name: Request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Request_id_seq"', 1, false);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 5, true);


--
-- Name: SavingLocation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SavingLocation_id_seq"', 1, false);


--
-- Name: Supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Supplier_id_seq"', 2, true);


--
-- Name: Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Type_id_seq"', 1, false);


--
-- Name: Vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Vehicle_id_seq"', 1, true);


--
-- Name: ActivityLog ActivityLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Employee Employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY (id);


--
-- Name: ErrorLog ErrorLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ErrorLog"
    ADD CONSTRAINT "ErrorLog_pkey" PRIMARY KEY (id);


--
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- Name: InboundItems InboundItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InboundItems"
    ADD CONSTRAINT "InboundItems_pkey" PRIMARY KEY (id);


--
-- Name: Inbound Inbound_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inbound"
    ADD CONSTRAINT "Inbound_pkey" PRIMARY KEY (id);


--
-- Name: Inventory Inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY (id);


--
-- Name: OutboundItems OutboundItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OutboundItems"
    ADD CONSTRAINT "OutboundItems_pkey" PRIMARY KEY (id);


--
-- Name: Outbound Outbound_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Outbound"
    ADD CONSTRAINT "Outbound_pkey" PRIMARY KEY (id);


--
-- Name: Position Position_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Position"
    ADD CONSTRAINT "Position_pkey" PRIMARY KEY (id);


--
-- Name: RequestItems RequestItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestItems"
    ADD CONSTRAINT "RequestItems_pkey" PRIMARY KEY (id);


--
-- Name: Request Request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: SavingLocation SavingLocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavingLocation"
    ADD CONSTRAINT "SavingLocation_pkey" PRIMARY KEY (id);


--
-- Name: Supplier Supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Supplier"
    ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY (id);


--
-- Name: Type Type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Type"
    ADD CONSTRAINT "Type_pkey" PRIMARY KEY (id);


--
-- Name: Vehicle Vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_pkey" PRIMARY KEY (id);


--
-- Name: ActivityLog_employeeId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ActivityLog_employeeId_key" ON public."ActivityLog" USING btree ("employeeId");


--
-- Name: Employee_employeeNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Employee_employeeNumber_key" ON public."Employee" USING btree ("employeeNumber");


--
-- Name: Employee_nik_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Employee_nik_key" ON public."Employee" USING btree (nik);


--
-- Name: ActivityLog ActivityLog_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Employee Employee_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Employee Employee_positionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES public."Position"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Employee Employee_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InboundItems InboundItems_inboundId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InboundItems"
    ADD CONSTRAINT "InboundItems_inboundId_fkey" FOREIGN KEY ("inboundId") REFERENCES public."Inbound"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InboundItems InboundItems_inventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InboundItems"
    ADD CONSTRAINT "InboundItems_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."Inventory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InboundItems InboundItems_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InboundItems"
    ADD CONSTRAINT "InboundItems_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."Type"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Inbound Inbound_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inbound"
    ADD CONSTRAINT "Inbound_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Supplier"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Inventory Inventory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Inventory Inventory_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."SavingLocation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Inventory Inventory_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."Type"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutboundItems OutboundItems_inventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OutboundItems"
    ADD CONSTRAINT "OutboundItems_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."Inventory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutboundItems OutboundItems_outboundId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OutboundItems"
    ADD CONSTRAINT "OutboundItems_outboundId_fkey" FOREIGN KEY ("outboundId") REFERENCES public."Outbound"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutboundItems OutboundItems_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OutboundItems"
    ADD CONSTRAINT "OutboundItems_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."Type"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Outbound Outbound_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Outbound"
    ADD CONSTRAINT "Outbound_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Supplier"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RequestItems RequestItems_inventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestItems"
    ADD CONSTRAINT "RequestItems_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."Inventory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RequestItems RequestItems_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestItems"
    ADD CONSTRAINT "RequestItems_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."Request"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RequestItems RequestItems_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestItems"
    ADD CONSTRAINT "RequestItems_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."Type"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Request Request_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Supplier"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

