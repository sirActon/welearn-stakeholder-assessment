---

## Field Reference

> Field names and field IDs are both usable; using **field IDs** makes your requests resilient to renames.

| Field Name | Field ID | Type | Notes / Constraints | Example Value(s) |
|------------|----------|------|---------------------|------------------|
| Name | `fldNptclsp9416arf` | Single line text | Person's full name | `"Ava Ramirez"` |
| Email | `fld7jcYxfQQCfhUWI` | Email | Valid email address | `"ava.ramirez@insightsworks.com"` |
| Company Name | `fldIGBJlDMIgtP3ms` | Single line text | Organization name | `"InsightsWorks"` |
| Company Size | `fld2jQmNSZ6wfsBmT` | Single select | Must match existing option unless `typecast=true` | `"51-100"`, `"101-1000"`, `"1-50"`, `"Over 1000"` |
| Industry | `fldiJW8GV8t5d7fux` | Single line text | Industry vertical | `"Technology"`, `"Healthcare"` |
| Learning Strategy Last Modified Year | `fldZPAsLHiHsUet6` | Number | Integer year | `2024`, `2021` |

### Dimension Ratings & Comments (30 questions)

Each dimension/question has two fields: one rating (number 1–5) and one comment (long text).

| Semantic Question Key | Rating Field ID | Comment Field ID | Type | Example Rating | Example Comment |
|----------------------|-----------------|------------------|------|----------------|------------------|
| Alignment: supports goals | `fldfGoESvnORT6lSm` | `fldhcJEKuQGYW7zwe` | number / long text | `5` | `"Ava Ramirez: ... is mature and well understood internally."` |
| Alignment: tied to KPIs | `fldr0evRPWhnXlwkZ` | `fldkmWsuWjfl6K3vA` | number / long text | `4` | `"Ava Ramirez: ... generally solid with room to formalize."` |
| Alignment: exec conversations | `fldpK0YT2Czn9CgdB` | `fld3XkdA51lQJASYd` | number / long text | `5` | `"Ava Ramirez: ... is mature and well understood internally."` |
| Alignment: updated with direction | `fldh2hke4QzP6BZvh` | `fldhgU50A4U0D4PgI` | number / long text | `5` | `"Ava Ramirez: ... is mature and well understood internally."` |
| Alignment: leaders enable | `fldYSqbpZhsbgUeXW` | `fldNxSjdUYOVdbLIC` | number / long text | `4` | `"Ava Ramirez: ... is generally solid with room to formalize."` |

| Governance: cross-functional governance body | `fldmDer24p3YQZOGQ` | `fld9XLQtbuCRKSMTO` | number / long text | `3` | `"Inconsistent across teams; some pockets doing well."` |
| Governance: decision rights & accountability | `fldb0oi5B85eNhTu8` | `fldM1FubnHPDk3lEQ` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Governance: prioritized enterprise-wide | `fldLY3nbcjipMncKm` | `fldGWgjpIIZse6MlE` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Governance: practices reviewed regularly | `fldoXEf1LUSYOUqLu` | `fldbtkYOIgtkwjptj` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Governance: stakeholder involvement | `fldlvBEjb1HzigZsf` | `flditqfRjrwpxXVg` | number / long text | `4` | `"Generally solid with room to formalize."` |

| Technology: platforms integrated | `fldRtmJTzo4RoThkF` | `fldjI1HJk7ymUHiDT` | number / long text | `5` | `"Mature and well understood internally."` |
| Technology: learner data personalization | `fldNtLvIeL1pWGoLb` | `fldDVTw5uUFmRb877` | number / long text | `5` | `"Mature and well understood internally."` |
| Technology: AI & automation strategy | `fldXbCiHNW2PX3KHM` | `fldiAQA9ihtIAkDkL` | number / long text | `5` | `"Mature and well understood internally."` |
| Technology: user-friendly adoption | `fldIstntoIuaF0Ivy` | `fldci9tXQ9cYHwyrB` | number / long text | `5` | `"Mature and well understood internally."` |
| Technology: roadmap evolution | `fldrLFmAbG5QPZ8iJ` | `fldLwk8dMXzll9rb7` | number / long text | `5` | `"Mature and well understood internally."` |

| Content: defined strategy & taxonomy | `fldB3nH25QIZT7MoK` | `fldS9UqDARMRMNhfs` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Content: curation cadence | `fldVC1LhMgZA0LPLP` | `fld1rkgMQgruMiEUe` | number / long text | `5` | `"Mature and well understood internally."` |
| Content: accessibility & inclusion | `fldLNsMXziWGF51Em` | `fldwHuDQ2VCJAlsvu` | number / long text | `3` | `"Inconsistent across teams; some pockets doing well."` |
| Content: alignment to critical skills | `flduex9kx8Y5NI3ux` | `fldtQswUba8BWjD5L` | number / long text | `3` | `"Inconsistent across teams; some pockets doing well."` |
| Content: blend of modalities | `fldcmcELmymzWqRe0` | `fld4akZ9G8U3wMDoW` | number / long text | `4` | `"Generally solid with room to formalize."` |

| Measurement: more than completions | `fldAEb4DqTqnQTBfS` | `fld7lBWPRFyEch5yg` | number / long text | `3` | `"Inconsistent across teams; some pockets doing well."` |
| Measurement: outcomes tied to impact | `fld4wXhLaDJCaqGTd` | `fld5YHic2P51aYFRz` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Measurement: dashboards informing decisions | `fldcADG1l28z2mGvK` | `fld9iKECmMVawk00e` | number / long text | `5` | `"Mature and well understood internally."` |
| Measurement: continuous improvement | `fldJ5bzvd3VPunhKg` | `fldjV01cfubxs4ZNg` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Measurement: metrics communicated | `fldEsTyB0MrQeaVlU` | `fldMJvABIiPTJsrr4` | number / long text | `4` | `"Generally solid with room to formalize."` |

| Culture: embedded in company culture | `fld0PCASZQQssZ5jZ` | `fldcQWGwqE8ErLyAg` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Culture: leaders modeling learning | `fldQEHlpj610sum8S` | `fldrDlsnGxl0N195r` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Culture: connected to performance/growth | `fldAibk1raCWW6GR0` | `fldIiWeFWrQnesXc8` | number / long text | `3` | `"Inconsistent across teams; some pockets doing well."` |
| Culture: employees supported | `fld3igmes4V5aGdup` | `fldi7FgprxebKcVy1` | number / long text | `4` | `"Generally solid with room to formalize."` |
| Culture: part of change initiatives | `fldXJUihfzHwcX5pw` | `fldd7gYpzeUIwgK7h` | number / long text | `3` | `"Inconsistent across teams; some pockets doing well."` |


### Summary / Outcome Fields

| Field Name | Field ID | Type | Notes | Example |
|------------|----------|------|-------|---------|
| Total Score | `fldAlU8EvL3hV7C2c` | Number | Sum of all 30 ratings (1–5 each; max 150) | `124` |
| Maturity Level | `fldwR6IcwXFej9Pzm` | Long text | Derived label based on total score | `"Strategic"` |

### Action Planning

| Field Name | Field ID | Type | Notes | Example |
|------------|----------|------|-------|---------|
| Priority Areas for Improvement | `flddZORL2bGfzixG3` | Multiple select | Array of selected options; `typecast=true` to create new if not exact match | `["Culture","Governance"]` |
| Quick Wins | `fldsLXUc0JkfDOeYw` | Long text | Short actionable items | `"Focus on improving Culture and Governance practices."` |
| Long-Term Strategic Shifts | `fldsCY8G1g4LY6Mdo` | Single select | Selected option name; see allowed value(s) | `"Build a formal roadmap and governance council; invest in integration and culture."` |
| Stakeholders to Engage | `fldTxUp9g9q6q1yDg` | Multiple select | Array of strings | `["Learning leaders","Executive sponsors"]` |
| Success Metrics | `fldlda1IgYKZTeZdT` | Long text | KPIs / measurement goals | `"Improved alignment scores, adoption rates, executive feedback"` |

---

## Maturity Level Logic (for agent to replicate)

Total score is the sum of all 30 question ratings (each 1–5):

- **30–74**: `Ad Hoc`
- **75–104**: `Operational`
- **105–129**: `Strategic`
- **130–150**: `Transformational`

## Environment Variables Reference

All Airtable configuration and secret values are injected via environment variables. Below are the expected names (as stored in your `.env.local`):

```env
# Airtable credentials & config
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_ID_SUBMISSIONS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME_SUBMISSIONS=Submissions      # optional human-readable fallback
AIRTABLE_DEFAULT_VIEW=Grid view                 # optional default view name
AIRTABLE_TYPECAST=true                          # "true" to allow auto-creating select options
AIRTABLE_API_URL=https://api.airtable.com/v0     # usually the default
AIRTABLE_REQUEST_TIMEOUT_MS=10000               # fetch timeout in milliseconds (optional)

```
