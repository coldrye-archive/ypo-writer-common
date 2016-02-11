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

import assert from 'esaver';


export class DummyStream extends WriteStream
{
    constructor(
        expectedEncoding = 'utf-8', expectedEOL = '\n', expectedData = ''
    )
    {
        super('/tmp/unused');
        this._expectedEncoding = expectedEncoding;
        this._expectedEOL = expectedEOL;
        this._expectedData = expectedData;
    }

    write(data, encoding)
    {
        assert.equal(encoding, this._expectedEncoding, 'encoding');

        const actualEol = data.substring(
            data.length - this._expectedEOL.length
        );
        assert.equal(actualEol, this._expectedEOL, 'eol');

        let actualData = data;
        if (data.length)
        {
            actualData = data.substring(
                0, data.length - this._expectedEOL.length
            );
        }

        assert.equal(actualData, this._expectedData, 'data');
    }

    end()
    {
        assert.ok(true, 'was closed');
    }
}

