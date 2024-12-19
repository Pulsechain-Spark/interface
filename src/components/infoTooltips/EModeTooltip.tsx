import { Trans } from '@lingui/macro';

import { FormattedNumber } from '../primitives/FormattedNumber';
import { Link } from '../primitives/Link';
import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const EModeTooltip = ({
  eModeLtv,
  ...rest
}: TextWithTooltipProps & { eModeLtv: number }) => {
  return (
    <TextWithTooltip {...rest}>
      <Trans>
        E-Mode increases your LTV for a selected category of assets up to
        <FormattedNumber
          value={Number(eModeLtv) / 10000}
          percent
          variant="secondary12"
          color="text.secondary"
        />
        .{' '}
        <Link
          href="https://docs.spark.fi/defi-infrastructure/sparklend/spark-lend-features#how-does-isolation-mode-affect-my-borrowing-power"
          sx={{ textDecoration: 'underline' }}
          variant="caption"
          color="text.secondary"
        >
          Learn more
        </Link>
      </Trans>
    </TextWithTooltip>
  );
};