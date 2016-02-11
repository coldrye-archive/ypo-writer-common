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


import AbstractVisitor from 'ypo-parser-common/visitor';

import AbstractWriter from './writer';


/**
 * The abstract class AbstractWriterVisitor models the root of derived visitors
 * participating in the process of writing EPO data to arbitrary target
 * formats.
 *
 * @public
 */
export default class AbstractWriterVisitor extends AbstractVisitor
{
    /**
     * @param {AbstractUnitWriter} writer - the writer
     * @returns {void}
     */
    constructor(writer)
    {
        super();

        if (!(writer instanceof AbstractWriter))
        {
            throw new TypeError('MSG_WRITER');
        }

        this._writer = writer;
    }

    /**
     * Gets the assigned writer.
     *
     * @returns {AbstractUnitWriter} - the writer
     */
    get writer()
    {
        return this._writer;
    }
}

