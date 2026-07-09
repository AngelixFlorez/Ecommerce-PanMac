import { useState } from "react";
import { uploadImageToImageKit } from "../lib/imagekitUpload.js";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";

export function AdminProductForm({ initial, saving, error, getToken, onCancel, onSubmit }) {
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "General");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [priceCents, setPriceCents] = useState(initial ? String(initial.priceCents / 100) : "");
  const [currency, setCurrency] = useState(initial?.currency ?? "COP");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [imageKitFileId, setImageKitFileId] = useState(initial?.imageKitFileId ?? "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [colors, setColors] = useState(initial?.colors ?? []);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const dollars = Number.parseFloat(priceCents);
    if (Number.isNaN(dollars) || dollars <= 0) return;

    const body = {
      slug: slug.trim(),
      name: name.trim(),
      category: category.trim() || "General",
      description: description.trim(),
      priceCents: Math.round(dollars * 100),
      currency: currency.trim().toLowerCase(),
      imageUrl: imageUrl.trim() || null,
      imageKitFileId: imageKitFileId.trim() || null,
      active,
      colors,
    };

    if (initial) {
      const patch = {};
      if (body.name !== initial.name) patch.name = body.name;
      if (body.category !== (initial.category ?? "General")) patch.category = body.category;
      if (body.description !== initial.description) patch.description = body.description;
      if (body.priceCents !== initial.priceCents) patch.priceCents = body.priceCents;
      if (body.currency !== initial.currency) patch.currency = body.currency;
      if ((body.imageUrl ?? "") !== (initial.imageUrl ?? "")) patch.imageUrl = body.imageUrl;
      if ((body.imageKitFileId ?? null) !== (initial.imageKitFileId ?? null)) {
        patch.imageKitFileId = body.imageKitFileId;
      }
      if (body.active !== initial.active) patch.active = body.active;
      if (JSON.stringify(body.colors) !== JSON.stringify(initial.colors ?? [])) patch.colors = body.colors;
      if (Object.keys(patch).length === 0) {
        onCancel();
        return;
      }
      onSubmit(patch);
    } else {
      onSubmit(body);
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadError(null);

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("El archivo es demasiado grande (máx 10 MB).");
      return;
    }

    const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : ".jpg";
    const base = (slug.trim() || "product").replace(/[^\w-]+/g, "-").slice(0, 80);

    setUploadingImage(true);

    try {
      const { url, fileId } = await uploadImageToImageKit(file, getToken, {
        fileName: `${base}-${Date.now()}${ext}`,
      });

      setImageUrl(url);
      setImageKitFileId(fileId ?? "");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
      <label className="form-control w-full">
        <span className="label-text">Slug</span>
        <input
          className="input input-bordered w-full"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          disabled={Boolean(initial)}
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">Nombre</span>
        <input
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">Categoría</span>
        <input
          className="input input-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Ej. Audio, Accesorios"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">Descripción</span>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="form-control">
          <span className="label-text">Precio</span>
          <input
            className="input input-bordered"
            type="number"
            step="0.01"
            min="0.01"
            value={priceCents}
            onChange={(e) => setPriceCents(e.target.value)}
            required
          />
        </label>

        <label className="form-control">
          <span className="label-text">Moneda</span>
          <input
            className="input input-bordered"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="form-control w-full">
        <span className="label-text">Imagen</span>
        <label className="mb-2 flex cursor-pointer flex-wrap items-center gap-2">
          <span className="btn btn-secondary btn-sm shrink-0">
            {uploadingImage ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "Subir a ImageKit"
            )}
          </span>

          <span className="text-xs text-base-content/60">PNG, JPG, WebP, GIF · máx 10 MB</span>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            disabled={uploadingImage || saving}
            onChange={handleImageUpload}
          />
        </label>

        <label className="label py-0">
          <span className="label-text-alt text-base-content/60">URL de la imagen (cualquier HTTPS)</span>
        </label>

        <input
          className="input input-bordered w-full"
          type="url"
          value={imageUrl}
          onChange={(e) => {
            const v = e.target.value;
            if (v !== imageUrl) setImageKitFileId("");
            setImageUrl(v);
          }}
          placeholder="https://..."
        />

        {uploadError ? (
          <span className="mt-1 text-xs text-error" role="alert">
            {uploadError}
          </span>
        ) : null}
        {imageUrl ? (
          <div className="mt-2 overflow-hidden rounded-lg border border-base-300 bg-base-200 p-2">
            <img
              src={imageKitOptimizedUrl(imageUrl, IK_PRESETS.formPreview)}
              alt=""
              className="mx-auto max-h-32 w-auto object-contain"
              decoding="async"
            />
          </div>
        ) : null}
      </div>

      <fieldset className="border border-base-300 rounded-box p-4">
        <legend className="text-sm font-medium text-base-content/70 px-1">Colores (opcional)</legend>
        <p className="text-xs text-base-content/50 mb-3">Si el producto viene en varios colores, agrégalos aquí.</p>
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              className="input input-bordered input-sm w-28"
              value={c.name}
              onChange={(e) => {
                const next = [...colors];
                next[i] = { ...next[i], name: e.target.value };
                setColors(next);
              }}
              placeholder="Nombre"
            />
            <input
              type="color"
              className="input input-bordered input-sm w-12 h-9 p-0.5"
              value={c.hex}
              onChange={(e) => {
                const next = [...colors];
                next[i] = { ...next[i], hex: e.target.value };
                setColors(next);
              }}
            />
            <span className="text-xs font-mono text-base-content/50">{c.hex}</span>
            <button
              type="button"
              className="btn btn-ghost btn-xs text-error"
              onClick={() => setColors(colors.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-ghost btn-xs gap-1 mt-1"
          onClick={() => setColors([...colors, { name: "", hex: "#cccccc" }])}
        >
          + Añadir color
        </button>
      </fieldset>

      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <span className="label-text">Activo en tienda</span>
      </label>

      {error ? (
        <div role="alert" className="alert alert-error text-sm">
          Error al guardar (revisa que el slug sea único y los campos).
        </div>
      ) : null}

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving || uploadingImage}>
          {saving ? <span className="loading loading-spinner loading-sm" /> : "Guardar"}
        </button>
      </div>
    </form>
  );
}
