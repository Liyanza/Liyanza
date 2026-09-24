import Image from "next/image";
import { FloatingStat, StatLine } from "@/components/ui/FloatingStat";
import { getMessages } from "@/i18n/server";

export async function BrandVisual() {
  const t = (await getMessages("auth")).shell;

  return (
    <div data-intro="visual" className="relative mx-auto w-full max-w-[514px]">
      <Image
        src="/auth-photo-v1.png"
        alt={t.imageAlt}
        width={1024}
        height={1024}
        sizes="514px"
        className="relative h-auto w-full object-contain"
        loading="eager"
        fetchPriority="high"
      />

      <FloatingStat
        label={t.stats.roi}
        value="320%"
        valueClassName="text-orange-500"
        className="flex left-[9.7%] top-[18.3%]"
        index={0}
      />
      <FloatingStat label={t.stats.budgetSplit} className="flex left-[72.6%] top-[25.3%]" index={1}>
        <StatLine>WhatsApp 60%</StatLine>
        <StatLine>Facebook 40%</StatLine>
      </FloatingStat>
      <FloatingStat label={t.stats.bestAudience} className="flex left-[2.3%] top-[53.4%]" index={2}>
        <StatLine>{t.stats.audienceValue}</StatLine>
      </FloatingStat>
      <FloatingStat
        label={t.stats.conversions}
        value="+28%"
        valueClassName="text-green-accent"
        className="flex left-[85.4%] top-[59.8%]"
        index={3}
      />
    </div>
  );
}
