--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-26 09:58:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4932 (class 1262 OID 16528)
-- Name: friorojas; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE friorojas WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';


ALTER DATABASE friorojas OWNER TO postgres;

\connect friorojas

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 224 (class 1259 OID 16769)
-- Name: articulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articulos (
    id_producto integer NOT NULL,
    titulo_nombre character varying(255) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    stock integer NOT NULL,
    url_imagen character varying(255)
);


ALTER TABLE public.articulos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16768)
-- Name: artículos_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."artículos_id_producto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."artículos_id_producto_seq" OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 223
-- Name: artículos_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."artículos_id_producto_seq" OWNED BY public.articulos.id_producto;


--
-- TOC entry 225 (class 1259 OID 16777)
-- Name: favoritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritos (
    id_usuario integer NOT NULL,
    id_publicacion integer NOT NULL
);


ALTER TABLE public.favoritos OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16720)
-- Name: publicaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicaciones (
    id integer NOT NULL,
    id_producto integer,
    id_usuario integer
);


ALTER TABLE public.publicaciones OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16719)
-- Name: publicaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publicaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.publicaciones_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 219
-- Name: publicaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publicaciones_id_seq OWNED BY public.publicaciones.id;


--
-- TOC entry 218 (class 1259 OID 16589)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    rol character varying(20) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16588)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 222 (class 1259 OID 16737)
-- Name: ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas (
    id_venta integer NOT NULL,
    id_publicacion integer,
    id_usuario_comprador integer
);


ALTER TABLE public.ventas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16736)
-- Name: ventas_id_venta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_id_venta_seq OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 221
-- Name: ventas_id_venta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_id_venta_seq OWNED BY public.ventas.id_venta;


--
-- TOC entry 4764 (class 2604 OID 16772)
-- Name: articulos id_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articulos ALTER COLUMN id_producto SET DEFAULT nextval('public."artículos_id_producto_seq"'::regclass);


--
-- TOC entry 4762 (class 2604 OID 16723)
-- Name: publicaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones ALTER COLUMN id SET DEFAULT nextval('public.publicaciones_id_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 16592)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 16740)
-- Name: ventas id_venta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas ALTER COLUMN id_venta SET DEFAULT nextval('public.ventas_id_venta_seq'::regclass);


--
-- TOC entry 4774 (class 2606 OID 16776)
-- Name: articulos artículos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articulos
    ADD CONSTRAINT "artículos_pkey" PRIMARY KEY (id_producto);


--
-- TOC entry 4776 (class 2606 OID 16781)
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id_usuario, id_publicacion);


--
-- TOC entry 4770 (class 2606 OID 16725)
-- Name: publicaciones publicaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 16598)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4768 (class 2606 OID 16596)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4772 (class 2606 OID 16742)
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (id_venta);


--
-- TOC entry 4780 (class 2606 OID 16787)
-- Name: favoritos favoritos_id_publicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_publicacion_fkey FOREIGN KEY (id_publicacion) REFERENCES public.publicaciones(id);


--
-- TOC entry 4781 (class 2606 OID 16782)
-- Name: favoritos favoritos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4777 (class 2606 OID 16731)
-- Name: publicaciones publicaciones_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4778 (class 2606 OID 16743)
-- Name: ventas ventas_id_publicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_id_publicacion_fkey FOREIGN KEY (id_publicacion) REFERENCES public.publicaciones(id);


--
-- TOC entry 4779 (class 2606 OID 16748)
-- Name: ventas ventas_id_usuario_comprador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_id_usuario_comprador_fkey FOREIGN KEY (id_usuario_comprador) REFERENCES public.usuarios(id_usuario);


-- Completed on 2025-02-26 09:58:11

--
-- PostgreSQL database dump complete
--

