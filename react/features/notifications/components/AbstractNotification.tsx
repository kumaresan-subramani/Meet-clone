import { Component } from 'react';
import { WithTranslation } from 'react-i18next';

import { NOTIFICATION_TYPE } from '../constants';

export interface IProps extends WithTranslation {

    /**
     * Display appearance for the component, passed directly to the
     * notification.
     */
    appearance: string;

    /**
     * Whether or not the title and description should be concatenated.
     */
    concatText?: boolean;

    /**
     * Callback invoked when the custom button is clicked.
     */
    customActionHandler: Function[];

    /**
     * The text to display as button in the notification for the custom action.
     */
    customActionNameKey: string[];

    /**
     * The type of button.
     */
    customActionType?: string[];

    /**
     * The text to display in the body of the notification. If not passed
     * in, the passed in descriptionKey will be used.
     */
    defaultTitleKey: string;

    /**
     * A description string that can be used in addition to the prop
     * descriptionKey.
     */
    description: string;

    /**
     * The translation arguments that may be necessary for the description.
     */
    descriptionArguments: Object;

    /**
     * The translation key to use as the body of the notification.
     */
    descriptionKey: string;

    /**
     * Whether the support link should be hidden in the case of an error
     * message.
     */
    hideErrorSupportLink: boolean;

    /**
     * The type of icon to be displayed. If not passed in, the appearance
     * type will be used.
     */
    icon?: string;

    /**
     * Maximum lines of the description.
     */
    maxLines?: number;

    /**
     * Callback invoked when the user clicks to dismiss the notification.
     */
    onDismissed: Function;

    /**
     * The text to display at the top of the notification. If not passed in,
     * the passed in titleKey will be used.
     */
    title: string;

    /**
     * The translation arguments that may be necessary for the title.
     */
    titleArguments: Object;

    /**
     * The translation key to display as the title of the notification if
     * no title is provided.
     */
    titleKey: string;

    /**
     * The unique identifier for the notification.
     */
    uid: string;
}

/**
 * Abstract class for {@code Notification} component.
 *
 * @augments Component
 */
export default class AbstractNotification<P extends IProps> extends Component<P> {
    /**
     * Default values for {@code Notification} component's properties.
     *
     * @static
     */
    static defaultProps = {
        appearance: NOTIFICATION_TYPE.NORMAL
    };

    /**
     * Initializes a new {@code Notification} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: P) {
        super(props);

        // Bind event handler so it is only bound once for every instance.
        this._onDismissed = this._onDismissed.bind(this);
    }

    /**
     * Returns the description array to be displayed.
     *
     * @protected
     * @returns {Array<string>}
     */
    _getDescription() {
        const {
            description,
            descriptionArguments,
            descriptionKey,
            t
        } = this.props;

        const descriptionArray = [];

        descriptionKey
            && descriptionArray.push(t(descriptionKey, descriptionArguments));

        description && descriptionArray.push(description);

        return descriptionArray;
    }

    /**
     * Returns the description key that was used if any.
     *
     * @protected
     * @returns {string}
     */
    _getDescriptionKey() {
        return this.props.descriptionKey;
    }

    /**
     * Callback to dismiss the notification.
     *
     * @private
     * @returns {void}
     */
    _onDismissed() {
        this.props.onDismissed(this.props.uid);
    }
}
