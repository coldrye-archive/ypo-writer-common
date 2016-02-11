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


import {WriteStream} from 'fs';


/**
 * The class LineWriter models a line based writer.
 *
 * @public
 */
export default class LineWriter
{
    /**
     * @public
     * @param {WriteStream} stream - the write stream
     * @param {Object} options - the options
     * @param {string} options.encoding='utf-8' - the encoding
     * @param {string} options.encoding='utf-8' - the encoding
     * @param {string} options.eol='\n' - the line determinator
     * @returns {void}
     */
    constructor(stream, {encoding='utf-8', eol='\n'} = {})
    {
        // TODO:extract assertions
        /* istanbul ignore else */
        if (!(stream instanceof WriteStream))
        {
            throw new TypeError('MSG_INSTANCE_OF_WRITESTREAM_EXPECTED');
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

        this._stream = stream;
        this._encoding = encoding;
        this._eol = eol;
    }

    /**
     * Gets the encoding.
     *
     * @public
     * @returns {string} - the encoding
     */
    get encoding()
    {
        return this._encoding;
    }

    /**
     * Gets the line determinator.
     *
     * @public
     * @returns {string} - the line determinator
     */
    get eol()
    {
        return this._eol;
    }

    /**
     * Closes the input stream.
     *
     * @public
     * @returns {void}
     */
    close()
    {
        this._stream.end();
    }

    /**
     * Writes the specified data to the underlying stream, with both the
     * configured encoding and line determinator being applied.
     *
     * @public
     * @param {string} data='' - the data
     * @returns {void}
     */
    write(data = '')
    {
        this._stream.write(data + this.eol, this.encoding);
    }
}


/**
 * @external {WriteStream} https://nodejs.org/api/fs.html#fs_class_fs_writestream
 */

