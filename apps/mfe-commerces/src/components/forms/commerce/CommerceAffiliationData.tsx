import type { CommerceAffiliationRow } from "@/types/commerce/CommerceList";

type CommerceAffiliationDataProps = {
  promotions?: CommerceAffiliationRow[];
};

export const CommerceAffiliationData = ({
  promotions,
}: CommerceAffiliationDataProps) => {
  const affiliationCount = promotions?.length ?? 0;

  return (
    <div>
      <h1>Datos de afiliación</h1>
      {affiliationCount === 0 ? (
        <p className="text-muted-foreground text-sm">
          No hay afiliaciones registradas.
        </p>
      ) : null}
    </div>
  );
};