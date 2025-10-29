/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, status } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

const RES_MODEL = "res.partner";

export class SendMailButton extends Component {
    static template = "ostwind_patrner_select_field.SendMailButton";

    setup() {
        super.setup();
        this.action = useService("action");
        this.user = useService("user");
        this.title = _t("Send Email");
    }

    async onClick() {
        this.action.doAction(
            {
                type: "ir.actions.act_window",
                target: "new",
                name: this.title,
                res_model: "mail.compose.message",
                views: [[false, "form"]],
                context: {
                    ...this.user.context,
                    default_res_model: RES_MODEL,
                    default_res_ids: [this.props.record.data[this.props.name][0],],
                    default_partner_ids: [this.props.record.data[this.props.name][0],],
                    default_composition_mode: "comment",
                },
            },
            {
                onClose: () => {
                    if (status(this) === "destroyed") {
                        return;
                    }
                },
            }
        );
    }

    get emailHref() {
        return "javascript:void();";
    }
}
