import * as core from '@actions/core';

/**
 * Logs data in a collapsible group
 * @param {string} label - Group label
 * @param {any} data - Data to log
 * @param {boolean} [stringify=true] - Whether to stringify the data
 */
export function logGroupData(label, data, stringify = true) {
    core.startGroup(label);
    core.info(stringify ? JSON.stringify(data, null, 2) : data);
    core.endGroup();
}