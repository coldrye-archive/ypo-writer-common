// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import fs from 'fs';

import PathBuilder from 'ypo-parser-common/pathbuilder';


/**
 * The abstract class AbstractUnitWriter models the root of a hierarchy of
 * derived classes responsible for writing a given Unit to the filesystem in
 * a writer specific format.
 *
 * @public
 */
export default class AbstractUnitWriter
{
    /**
     * @public
     * @param {PathBuilder} pathBuilder - the path builder instance
     * @param {Object} options - the options
     * @param {string} options.encoding='utf-8' - the encoding
     * @param {string} options.eol='\n' - the line determinator
     * @returns {void}
     */
    constructor(pathBuilder, {encoding='utf-8', eol='\n'} = {})
    {
        // TODO:extract assertions
        /* istanbul ignore else */
        if (!(pathBuilder instanceof PathBuilder))
        {
            throw new TypeError('MSG_PATHBUILDER_EXPECTED');
        }

        /* istanbul ignore else */
        if (typeof encoding != 'string' || !encoding.length)
        {
            throw new TypeError('MSG_ENCODING_MUST_BE_NONEMPTY_STRING');
        }

        /* istanbul ignore else */
        if (typeof eol != 'string' || !eol.length)
        {
            throw new TypeError('MSG_EOL_MUST_BE_NONEMPTY_STRING');
        }

        this._encoding = encoding;
        this._eol = eol;
        this._pathBuilder = pathBuilder;
    }

    /**
     * Gets the encoding.
     *
     * @returns {string} - the encoding
     */
    get encoding()
    {
        return this._encoding;
    }

    /**
     * Gets the line determinator.
     *
     * @returns {string} - the line determinator
     */
    get eol()
    {
        return this._eol;
    }

    /**
     * Gets the path builder instance.
     *
     * @returns {PathBuilder} - the path builder instance
     */
    get pathBuilder()
    {
        return this._pathBuilder;
    }

    /**
     * Creates a new write stream for the specified unit by utilizing the path
     * builder for determining the output path.
     *
     * @private
     * @param {Unit} unit - the unit
     * @returns {WriteStream} - the configured write stream
     */
    createWriteStream(unit)
    {
        let outpath = this.pathBuilder.buildPath(
            unit.lang.value, unit.ns.value
        );

        return fs.createWriteStream(outpath, {defaultEncoding: this.encoding});
    }

    /**
     * Writes out a representation of the specified unit to a path determined
     * by the configured path builder.
     *
     * @abstract
     * @param {Unit} unit - the unit
     * @returns {void}
     */
    /* eslint no-unused-vars: 0 */
    writeUnit(unit)
    {
        throw new Error('derived classes must implement this.');
    }
}


/**
 * @external {Unit} http://ypo.es.coldrye.eu/projects/ypo-parser-common/doc/public/class/src/unit.es~Unit.html
 */


/**
 * @external {PathBuilder} http://ypo.es.coldrye.eu/projects/ypo-parser-common/doc/public/class/src/pathbuilder.es~PathBuilder.html
 */

