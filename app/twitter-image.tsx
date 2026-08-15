// Reuse the OpenGraph image for the Twitter card. `runtime` is intentionally
// not re-exported (Next can't statically read a re-exported runtime field),
// so this route uses the default runtime, which renders ImageResponse fine.
export { default, alt, size, contentType } from "./opengraph-image";
