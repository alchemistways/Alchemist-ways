# 3D book model drop-in

Place your book file here as:

```
public/models/alchemist-book.glb
```

When that file exists, the hero `Book3D` canvas loads it automatically via `@react-three/drei` `useGLTF`.

Until then, a procedural chrome hardcover (A · W / Alchemist Ways / Malek Najm Ghaleb spine) renders with React Three Fiber.
